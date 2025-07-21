import { EventBus } from "./event-bus";

// Define the events and their argument types
type BlockEvents = {
  //   [key: string]: unknown[];
  init: [];
  componentDidMount: [oldProps?: Record<string, unknown>];
  componentDidUpdate: [oldProps: Record<string, unknown>, newProps: Record<string, unknown>];
  render: [];
  //   flowCDM: [];
  //   flowRender: [];
};

// Нельзя создавать экземпляр данного класса
class Block {
  static EVENTS = {
    INIT: "init",
    COMPONENT_DID_MOUNT: "componentDidMount",
    COMPONENT_DID_UPDATE: "componentDidUpdate",
    RENDER: "render",
    // FLOW_CDM: "flowCDM",
    // FLOW_RENDER: "flowRender"
  } as const;

  private _element: HTMLElement | null = null;
  private _meta: { tagName: string; props: Record<string, unknown> };
  public props: Record<string, unknown>;
  private _eventBus: EventBus<BlockEvents>;

  constructor(tagName: string = "div", props: Record<string, unknown> = {}) {
    this._eventBus = new EventBus<BlockEvents>();

    this._meta = {
      tagName,
      props,
    };

    this.props = this._makePropsProxy(props);

    this._registerEvents();
    this._eventBus.emit(Block.EVENTS.INIT);
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

  init = () => {
    this._createResources();
    this._eventBus.emit(Block.EVENTS.RENDER);
  };

  private _componentDidMount() {
    this.componentDidMount();
  }

  // May be overridden by subclasses
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

  setProps = (nextProps: Record<string, unknown>): void => {
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
      // Это небезопасный метод для упрощения логики
      // Используйте шаблонизатор из npm или напишите свой безопасный
      // Нужно компилировать не в строку (или делать это правильно),
      // либо сразу превращать в DOM-элементы и возвращать из compile DOM-ноду
      this._element.innerHTML = block;
    }
  }

  // Переопределяется пользователем. Необходимо вернуть разметку
  render(): string {
    return "";
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

  private _createDocumentElement(tagName: string): HTMLElement {
    return document.createElement(tagName);
  }

  //   show(): void {
  //     const content = this.getContent();
  //     if (content) {
  //       content.style.display = "block";
  //     }
  //   }

  //   hide(): void {
  //     const content = this.getContent();
  //     if (content) {
  //       content.style.display = "none";
  //     }
  //   }
}

export default Block;
