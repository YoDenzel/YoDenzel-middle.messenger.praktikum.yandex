type EventHandler<T extends unknown[] = unknown[]> = (...args: T) => void;

export class EventBus<Events extends Record<string, unknown[]>> {
  private listeners: {
    [K in keyof Events]?: EventHandler<Events[K]>[]
  } = {};

  on<K extends keyof Events>(event: K, handler: EventHandler<Events[K]>): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(handler);
  }

  off<K extends keyof Events>(event: K, handler: EventHandler<Events[K]>): void {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event].filter(h => h !== handler);
  }

  emit<K extends keyof Events>(event: K, ...args: Events[K]): void {
    if (!this.listeners[event]) return;
    this.listeners[event].forEach(handler => handler(...args));
  }
}
