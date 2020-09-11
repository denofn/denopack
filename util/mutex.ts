export default class Mutex {
  #locking = Promise.resolve();
  #locks = 0;

  isLocked() {
    return this.#locks > 0;
  }

  lock() {
    this.#locks += 1;

    let unlockNext: () => void;

    let willLock = new Promise<void>((resolve) =>
      unlockNext = () => {
        this.#locks -= 1;

        resolve();
      }
    );

    let willUnlock = this.#locking.then(() => unlockNext);

    this.#locking = this.#locking.then(() => willLock);

    return willUnlock;
  }
}
