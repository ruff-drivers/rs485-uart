/*!
 * Copyright (c) 2016 Nanchao Inc.
 * All rights reserved.
 */

'use strict';

var driver = require('ruff-driver');
var ReadStreaming = require('./read-streaming');
var mdelay = driver.mdelay;

module.exports = driver({
    attach: function (inputs, context) {
        var that = this;
        this._gpio = inputs['gpio'];
        this._uart = inputs['uart'];
        this._readStream = new ReadStreaming(this._uart);

        this._readStream.on('data', function (data) {
            that.emit('data', data);
        });

        this._baudRate = this._uart.baudRate;
        this._stopBits = this._uart.stopBits;
        this._dataBits = this._uart.dataBits;
        this._parity = this._uart.parity;
        this._charLength = 1 + this._dataBits + this._stopBits + (!!this._parity - 0);

        var args = context.args;

        this._txEnableControl = args.txEnableControl;
        this._txActiveLevel = args.txActiveLevel;

        this._readStream.start();
    },
    exports: {
        write: function (data, callback) {
            var that = this;
            this._gpio.write(this._txActiveLevel, function (error) {
                if (error) {
                    callback(error);
                    return;
                }
                rxToTxSwitchDelay.call(that);
                that._uart.write(data, function (error, length) {
                    txToRxSwitchDelay.call(that, data);
                    that._gpio.write(1 - that._txActiveLevel, function () {
                        if (error) {
                            callback(error);
                        } else {
                            callback(undefined, length);
                        }
                    });
                });
            });
        }
    }
});

function txToRxSwitchDelay(data) {
    if (this._txEnableControl) {
        var dataLength = data.length;
        var delay = 1000 / this._baudRate * this._charLength * dataLength;
        mdelay(delay);
    }
}
function rxToTxSwitchDelay() {
    if (this._txEnableControl) {
        mdelay(1);
    }
}
