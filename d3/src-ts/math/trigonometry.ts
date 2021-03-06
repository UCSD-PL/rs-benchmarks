/// <reference path="../../d3.d.ts" />
var π = Math.PI,
    τ = 2 * π,
    halfπ = π / 2,
    ε = 1e-6,
    ε2 = ε * ε,
    d3_radians = π / 180,
    d3_degrees = 180 / π;

function d3_sgn(x:number):number {
  return x > 0 ? 1 : x < 0 ? -1 : 0;
}

// Returns the 2D cross product of AB and AC vectors, i.e., the z-component of
// the 3D cross product in a quadrant I Cartesian coordinate system (+x is
// right, +y is up). Returns a positive value if ABC is counter-clockwise,
// negative if clockwise, and zero if the points are collinear.


interface D3Vector {
  0:number;
  1:number;
}
function d3_cross2d(a:D3Vector, b:D3Vector, c:D3Vector):number {
  return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
}

function d3_acos(x:number):number {
  return x > 1 ? 0 : x < -1 ? π : Math.acos(x);
}

function d3_asin(x:number):number {
  return x > 1 ? halfπ : x < -1 ? -halfπ : Math.asin(x);
}

function d3_sinh(x:number):number {
  return ((x = Math.exp(x)) - 1 / x) / 2;
}

function d3_cosh(x:number):number {
  return ((x = Math.exp(x)) + 1 / x) / 2;
}

function d3_tanh(x:number):number {
  return ((x = Math.exp(2 * x)) - 1) / (x + 1);
}

function d3_haversin(x:number):number {
  return (x = Math.sin(x / 2)) * x;
}
