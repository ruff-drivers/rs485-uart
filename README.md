[![Build Status](https://travis-ci.org/ruff-drivers/rs485-uart.svg)](https://travis-ci.org/ruff-drivers/rs485-uart)

# RS-485 driver for Ruff

RS-485 driver with UART interface.

## Supported Engines

* Ruff: ~1.2.0

## Supported Models

- [rs485-uart](https://rap.ruff.io/devices/rs485-uart)

## Installing

Execute following command and enter a **supported model** to install.

```sh
# Please replace `<device-id>` with a proper ID.
# And this will be what you are going to query while `$('#<device-id>')`.
rap device add <device-id>

# Then enter a supported model, for example:
# ? model: rs485-uart
# ? value (boolean) for argument "txEnableControl": (y/N)
# ? value (number) for argument "txActiveLevel": (1)
# ? value (number) for argument "baudRate": (9600)
# ? value (number) for argument "stopBits": (1)
# ? value (number) for argument "dataBits": (8)
# ? value (string) for argument "parity": (none)
```

Other possible steps involved if any.

## Usage

Here is the basic usage of this driver.

```js
$('#<device-id>').read(callback);
$('#<device-id>').write(data, callback);
```

## FAQ

Common issues or pitfalls of using this driver. Can be removed if none.

## API References

### Methods

#### `write(data[, callback])`

Write data to the RS-485 bus.

- **callback:** The callback gets `error` and `length` as its arguments.

### Events

#### `data`

Emitted when data comes.

## Contributing

Contributions to this project are warmly welcome. But before you open a pull request, please make sure your changes are passing code linting and tests.

You will need the latest [Ruff SDK](https://ruff.io/) to install rap dependencies and then to run tests.

### Installing Dependencies

```sh
npm install
rap install
```

### Running Tests

```sh
npm test
```

## License

The MIT License (MIT)

Copyright (c) 2016 Nanchao Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
