import { $ } from "dom";
function easeInOutCubic(x: number): number {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}
function fmod(a: number, b: number): number {
  return Number((a - Math.floor(a / b) * b).toPrecision(8));
}

function shuffleArray<T>(array: T[]) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

export const setupWheel = () => {
  CanvasRenderingContext2D.prototype.arc = function (
    x,
    y,
    radius,
    startAngle,
    endAngle,
    anticlockwise
  ) {
    // Signed length of curve
    var signedLength;
    var tau = 2 * Math.PI;

    if (!anticlockwise && endAngle - startAngle >= tau) {
      signedLength = tau;
    } else if (anticlockwise && startAngle - endAngle >= tau) {
      signedLength = -tau;
    } else {
      var delta = endAngle - startAngle;
      signedLength = delta - tau * Math.floor(delta / tau);

      // If very close to a full number of revolutions, make it full
      if (Math.abs(delta) > 1e-12 && signedLength < 1e-12) signedLength = tau;

      // Adjust if anti-clockwise
      if (anticlockwise && signedLength > 0) signedLength = signedLength - tau;
    }

    // Minimum number of curves; 1 per quadrant.
    var minCurves = Math.ceil(Math.abs(signedLength) / (Math.PI / 2));

    // Number of curves; square-root of radius (or minimum)
    var numCurves = Math.ceil(Math.max(minCurves, Math.sqrt(radius)));

    // "Radius" of control points to ensure that the middle point
    // of the curve is exactly on the circle radius.
    var cpRadius = radius * (2 - Math.cos(signedLength / (numCurves * 2)));

    // Angle step per curve
    var step = signedLength / numCurves;

    // Draw the circle
    this.lineTo(
      x + radius * Math.cos(startAngle),
      y + radius * Math.sin(startAngle)
    );
    for (
      var i = 0, a = startAngle + step, a2 = startAngle + step / 2;
      i < numCurves;
      ++i, a += step, a2 += step
    )
      this.quadraticCurveTo(
        x + cpRadius * Math.cos(a2),
        y + cpRadius * Math.sin(a2),
        x + radius * Math.cos(a),
        y + radius * Math.sin(a)
      );
  };
  let canvas: HTMLCanvasElement = $("canvas#wheel")! as HTMLCanvasElement;
  const ctx = canvas.getContext("2d")!;

  let data: Array<{ name: string; weight: number }> = [
    // { name: "badcop_", weight: 5 },
    // { name: "pomoTheDog", weight: 4 },
    // { name: "rincs4", weight: 1 },
    // { name: "rincs", weight: 1 },
    // { name: "rincs3", weight: 1 },
  ];

  const colors = [
    "#ff0000",
    "#ff8700",
    "#ffd300",
    "#deff0a",
    "#a1ff0a",
    "#0aff99",
    "#0aefff",
    "#147df5",
    "#580aff",
    "#be0aff",
  ];

  // shuffleArray(colors);

  let spin_t = 0.0;
  let spin_angle = Math.random() * 2 * Math.PI;
  let printed = false;
  let spinning = false;
  let visible = false;
  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!visible) {
      return;
    }
    if (spinning) spin_t += 0.001;
    const spin =
      easeInOutCubic(Math.min(1, spin_t)) * (Math.PI * 30 + spin_angle);

    let totalWeight = data.reduce((a, b) => a + b.weight, 0);
    let offset = 0;
    if (spin_t > 1.0 && !printed) {
      printed = true;
      console.log();
      const v = fmod(-spin_angle - Math.PI / 2, Math.PI * 2);
      data.forEach((u) => {
        const start = offset;
        const end = (Math.PI * 2 * u.weight) / totalWeight + offset;
        if (v >= start && v < end) {
          console.log(u.name);
          const event = new CustomEvent("wheel-result", {
            detail: { winner: u.name },
          });
          document.dispatchEvent(event);
          setTimeout(() => {
            visible = false;
          }, 5000);
        }
        offset += (Math.PI * 2 * u.weight) / totalWeight;
      });
    }
    ctx.lineWidth = canvas.width / 5;
    let radius = canvas.width / 4;

    offset = 0;
    data.forEach((u, i) => {
      ctx.beginPath();
      ctx.strokeStyle = colors[i % colors.length];
      const weight = u.weight / totalWeight;
      ctx.arc(
        canvas.width / 2,
        canvas.height / 2,
        radius,
        offset + fmod(spin, Math.PI * 2),
        Math.PI * 2 * weight + offset + fmod(spin, Math.PI * 2)
      );
      const middle = (Math.PI * 2 * weight + offset * 2) / 2 + 0.05 + spin;
      offset += Math.PI * 2 * weight;
      ctx.stroke();
      ctx.closePath();
      if (weight < 0.02) return;
      const fntSize = Math.max(41 - u.name.length * 2, 10);
      ctx.font = `${fntSize}px Arial`;
      ctx.save();

      ctx.fillStyle = "black";
      ctx.translate(
        canvas.width / 2 + Math.cos(middle) * radius,
        canvas.height / 2 + Math.sin(middle) * radius
      );
      ctx.rotate(middle);
      ctx.textAlign = "center";
      ctx.fillText(u.name, 0, 0);
      ctx.restore();
    });
    ctx.beginPath();

    const tw = 30;
    const th = 25;
    ctx.moveTo(canvas.width / 2 - tw / 2, canvas.height / 8);
    ctx.lineTo(canvas.width / 2, canvas.height / 8 + th);
    ctx.lineTo(canvas.width / 2 + tw / 2, canvas.height / 8);
    ctx.closePath();
    ctx.lineWidth = 10;
    ctx.strokeStyle = "black";
    ctx.stroke();

    // the fill color
    ctx.fillStyle = "#FFCC00";
    ctx.fill();
    setTimeout(draw, 16);
  };

  const spin_it = () => {
    printed = false;
    spin_t = 0;
    spin_angle = Math.random() * 2 * Math.PI;
    spinning = true;
  };

  $.listen("wheel-add-user", (e) => {
    data.push(e.detail.data);
  });
  $.listen("wheel-show", (e) => {
    data = [];
    visible = true;
    draw();
  });
  $.listen("wheel-spin", (e) => {
    spin_it();
  });
};
