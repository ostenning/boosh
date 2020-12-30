extern crate console_error_panic_hook;
extern crate wee_alloc;
use rustfft::num_traits::Zero;
use rustfft::{num_complex::Complex, FFTplanner};
use wasm_bindgen::prelude::*;

#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen(start)]
pub fn run() {
  console_error_panic_hook::set_once();
  log("wasm loaded");
}

#[wasm_bindgen]
pub fn add(a: u32, b: u32) -> u32 {
  return a + b;
}

#[wasm_bindgen]
pub fn fft(data: &[f64]) -> Box<[f64]> {
  let mut input: Vec<Complex<f64>> = data.iter().map(|&x| Complex::new(x, 1.0)).collect();
  let mut output: Vec<Complex<f64>> = vec![Complex::zero(); 1024];
  let mut planner = FFTplanner::new(false);
  let fft = planner.plan_fft(1024);
  fft.process(&mut input, &mut output);
  let vector: Vec<f64> = output.iter().map(|&x| x.re).collect();
  vector.into_boxed_slice()
}

#[wasm_bindgen]
extern "C" {
  // Use `js_namespace` here to bind `console.log(..)` instead of just
  // `log(..)`
  #[wasm_bindgen(js_namespace = console)]
  fn log(s: &str);

  // The `console.log` is quite polymorphic, so we can bind it with multiple
  // signatures. Note that we need to use `js_name` to ensure we always call
  // `log` in JS.
  #[wasm_bindgen(js_namespace = console, js_name = log)]
  fn log_u32(a: u32);

  // Multiple arguments too!
  #[wasm_bindgen(js_namespace = console, js_name = log)]
  fn log_many(a: &str, b: &str);
}
