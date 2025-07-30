import { v4 as uuidv4 } from "uuid";
import { EventBus } from "./event-bus";
import Handlebars from "handlebars";

type BlockEvents = {
  init: [];
  componentDidMount: [oldProps?: Record<string, unknown>];
  componentDidUpdate: [oldProps: Record<string, unknown>, newProps: Record<string, unknown>];
  render: [];
};

export interface BaseProps extends Record<string, unknown> {
  events?: Record<string, (e: Event) => void>;
}

// TODO: abstract class
export class Block<TProps extends BaseProps = BaseProps> {
  static EVENTS = {
    INIT: "init",
    COMPONENT_DID_MOUNT: "componentDidMount",
    COMPONENT_DID_UPDATE: "componentDidUpdate",
    RENDER: "render",
  } as const;

  private _element: HTMLElement | null = null;
  private _meta: { tagName: string; props: Record<string, unknown> };
  public props: TProps;
  public children: Record<string, Block>;
  private _eventBus: EventBus<BlockEvents>;
  private _id: string | null = null;

  constructor(tagName: string = "div", propsAndChildren: Record<string, unknown> = {}) {
    const { props, children } = this._getChildren(propsAndChildren);
    this._eventBus = new EventBus<BlockEvents>();

    this._meta = {
      tagName,
      props,
    };

    this._id = uuidv4();

    this.props = this._makePropsProxy({ ...props, __id: this._id }) as TProps;
    this.children = children;

    this._registerEvents();
    this._eventBus.emit(Block.EVENTS.INIT);
  }

  private _getChildren(propsAndChildren: Record<string, unknown>) {
    const props: Record<string, unknown> = {};
    const children: Record<string, Block> = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      // TODO: children should be an array of blocks
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });
    return { props, children };
  }

  private _registerEvents() {
    this._eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    this._eventBus.on(Block.EVENTS.COMPONENT_DID_MOUNT, this._componentDidMount.bind(this));
    this._eventBus.on(Block.EVENTS.COMPONENT_DID_UPDATE, this._componentDidUpdate.bind(this));
    this._eventBus.on(Block.EVENTS.RENDER, this._render.bind(this));
  }

  private _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  private _addEvents() {
    const { events = {} } = this.props;
    Object.keys(events).forEach((eventName) => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }

  private _removeEvents() {
    const { events = {} } = this.props;
    Object.keys(events).forEach((eventName) => {
      this._element?.removeEventListener(eventName, events[eventName]);
    });
  }

  init = () => {
    this._createResources();
    this._eventBus.emit(Block.EVENTS.RENDER);
  };

  private _componentDidMount() {
    this.componentDidMount();

    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
    });
  }

  componentDidMount(oldProps?: Record<string, unknown>): void {}

  dispatchComponentDidMount() {
    this._eventBus.emit(Block.EVENTS.COMPONENT_DID_MOUNT);
  }

  private _componentDidUpdate(oldProps: Record<string, unknown>, newProps: Record<string, unknown>) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this._eventBus.emit(Block.EVENTS.RENDER);
    }
  }

  componentDidUpdate(oldProps: Record<string, unknown>, newProps: Record<string, unknown>): boolean {
    return true;
  }

  setProps = (nextProps: Partial<TProps>): void => {
    if (!nextProps) {
      return;
    }
    Object.assign(this.props, nextProps);
  };

  get element(): HTMLElement | null {
    return this._element;
  }

  private _render() {
    const block = this.render();
    if (this._element) {
      this._removeEvents();
      this._element.innerHTML = "";
      this._element.appendChild(block);
      this._addEvents();
    }
  }

  render(): DocumentFragment {
    return new DocumentFragment();
  }

  getContent(): HTMLElement | null {
    return this.element;
  }

  private _makePropsProxy(props: Record<string, unknown>) {
    const eventBus = this._eventBus;
    return new Proxy(props, {
      get(target: Record<string, unknown>, prop: string) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop: string, value) {
        const oldTarget = { ...target };
        target[prop] = value;
        eventBus.emit(Block.EVENTS.COMPONENT_DID_UPDATE, oldTarget, target);
        return true;
      },
      deleteProperty(): boolean {
        throw new Error("No access");
      },
    });
  }

  private _createDocumentElement(tagName: string): HTMLElement | HTMLTemplateElement {
    const element = document.createElement(tagName) as HTMLElement | HTMLTemplateElement;
    if (this._id) {
      element.setAttribute("data-id", this._id);
    }
    return element;
  }

  compile(template: string, props: Record<string, unknown>) {
    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
      if (child instanceof Block) {
        propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
      }
    });

    const fragment = this._createDocumentElement("template") as HTMLTemplateElement;
    fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);

      const content = child?.getContent();
      if (content) {
        stub?.replaceWith(content);
      }
    });

    return fragment.content;
  }
}
