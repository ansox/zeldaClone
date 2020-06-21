export default class Camera {
  static x = 0;
  static y = 0;

  static clamp(xAtual, xMin, xMax) {
    if (xAtual < xMin) {
      xAtual = xMin;
    }

    if (xAtual > xMax) {
      xAtual = xMax;
    }

    return xAtual;
  }
}