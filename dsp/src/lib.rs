extern crate console_error_panic_hook;
extern crate wee_alloc;
use js_sys::Math;
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

static mut BUFFER_SIZE: usize = 1024;

#[wasm_bindgen]
pub fn init(size: usize) {
  unsafe {
    BUFFER_SIZE = size;
  }

  log("dsp lib initialized");
}

pub fn get_buffer_size() -> usize {
  unsafe {
    return BUFFER_SIZE;
  }
}

#[wasm_bindgen]
pub fn fft(data: &[f32]) -> Box<[f32]> {
  let mut input: Vec<Complex<f32>> = data.iter().map(|&x| Complex::new(x, 1.0)).collect();
  let mut output: Vec<Complex<f32>> = vec![Complex::zero(); get_buffer_size()];
  let mut planner = FFTplanner::new(false);
  let fft = planner.plan_fft(get_buffer_size());
  fft.process(&mut input, &mut output);
  let vector: Vec<f32> = output.iter().map(|&x| x.re).collect();
  vector.into_boxed_slice()
}

#[wasm_bindgen]
pub fn white_noise(data: &[f32]) -> Box<[f32]> {
  let values: Vec<f32> = data
    .iter()
    .map(|&x| {
      return x + (((Math::random() as f32) * 2.0) - 1.0) * 0.2 as f32;
    })
    .collect();

  return values.into_boxed_slice();
}

#[wasm_bindgen]
extern "C" {
  #[wasm_bindgen(js_namespace = console)]
  fn log(s: &str);
}
