/*!
 * Copyright (c) 2016 Nanchao Inc.
 * All rights reserved.
 */

'use strict';

var driver = require('ruff-driver');
var mdelay = driver.mdelay;

module.exports = driver({
    attach: function (inputs, context) {
        var that = this;
        this._gpio = inputs['gpio'];
        this._uart = inputs['uart'];

        var baudRate = this._uart.baudRate;
        var stopBits = this._uart.stopBits;
        var dataBits = this._uart.dataBits;
        var parity = this._uart.parity;

        this._baudRate = baudRate;
        this._charLength = 1 + dataBits + stopBits + (!!parity - 0);

        this._txEnableControl = context.args.txEnableControl;
        this._txActiveLevel = context.args.txActiveLevel;

        this._uart.on('data', function (data) {
            that.emit('data', data);
        });
        this._uart.on('error', function (error) {
            that.emit('error', error);
        });
    },
    exports: {
        write: function (data, callback) {
            var that = this;
            this._gpio.write(this._txActiveLevel, function (error) {
                if (error) {
                    callback && callback(error);
                    return;
                }
                rxToTxSwitchDelay.call(that);
                that._uart.write(data, function (error, length) {
                    txToRxSwitchDelay.call(that, data);
                    that._gpio.write(1 - that._txActiveLevel, function () {
                        if (error) {
                            callback && callback(error);
                        } else {
                            callback && callback(undefined, length);
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
