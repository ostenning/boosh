# boosh 🔊
_WebAssembly DSP workbench powered by Rust_

<img src="https://status.david-dm.org/gh/ostenning/boosh.svg" />

<hr />

## about

`boosh` is a DSP (Digital Signal Processing) work bench that allows the user to modify sounds in real-time. The purpose is to showcase WASM for DSP while investigating various DSP algorithms (delays, reverbs, overdrive etc).

## project structure

`boosh` is split into webapp and webassembly source in the `webapp` and `dsp` folders respectively. `webapp` is powered by NextJS and `dsp` uses rust with various dsp libraries. 

## targets

The rust dsp workbench aims to be lightweight and compatible with embedded environments for this reason `no-std` support is intended.

## instructions

To build the dsp libraries targeted for wasm, simply run: `wasm-pack build`. For instruction for NextJS please see `webapp/package.json`.