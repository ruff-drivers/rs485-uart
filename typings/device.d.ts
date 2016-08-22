export declare class Rs485 extends RuffDevice {
    /**
     * Turn this device on.
     * @param data - The data to be written.
     * @param callback - The callback.
     */
    write(data: Buffer, callback: (error: Error) => void): void;

    /**
     * data event
     */
    on(event: 'data', listener: () => void): this;
}

export default Rs485;
