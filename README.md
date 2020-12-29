# boosh 🔊
_WebAssembly DSP workbench powered by Rust_

### about

boosh is split into webapp and webassembly source in the `webapp` and `dsp` folders respectively. `webapp` is powered by NextJS and `dsp` uses rust with various dsp libraries. 

### targets

The rust dsp workbench aims to be lightweight and compatible with embedded environments for this reason `no-std` support is intended.

### instructions

To build the dsp libraries targeted for wasm, simply run: `wasm-pack build --target web`. For instruction for NextJS please see `webapp/package.json`.