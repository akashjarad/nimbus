
/**
 * Builds an EC2 Instance object
 */
EC2Instance = function (origin, size) {

  // Set height based on instance size
  var height = 0.5;
  switch (size) {
    case 'large':
      height = 2;
    break;
    case 'medium':
      height = 1;
    break;
  }

  // Make a collection object to hold everything
  var i = new Isomer.Object3D()

  // Push in a base prism
  i.push(Isomer.Shape.Prism(origin, 1, 1, height),
    new Isomer.Color(195, 195, 195));

  // Add a logo on top
  i.push(new Isomer.Path([
    origin.translate(0.1, 0.1, height),
    origin.translate(0.3, 0.1, height),
    origin.translate(0.3, 0.3, height),
    origin.translate(0.1, 0.3, height)
  ]), new Isomer.Color(72, 72, 72));

  return i
}

/**
 * Builds a rudimetary S3 object
 */
S3 = function (origin) {

  // Make a collection object to hold everything
  var s = new Isomer.Object3D()

  // Sizing
  var w = 1.5;
  var h = w;
  var l = w * 1.5;

  // Make our base shape
  s.push(Isomer.Shape.Prism(origin, l, w, h),
    new Isomer.Color(195, 195, 195));

  // Add a logo on top - currenly a square
  s.push(new Isomer.Path([
    origin.translate(l/2 - 0.2, w/2 - 0.2, h),
    origin.translate(l/2 + 0.2, w/2 - 0.2, h),
    origin.translate(l/2 + 0.2, w/2 + 0.2, h),
    origin.translate(l/2 - 0.2, w/2 + 0.2, h)
  ]), new Isomer.Color(72, 72, 72));

  return s
}

/**
 * Basic ELB style object
 */
ELB = function (origin) {

  // Make a collection object to hold everything
  var elb = new Isomer.Object3D();

  // This gives a true octagonal prism
  var cornerRadius = (1 - (1 / (1 + Math.sqrt(2)))) / 2;

  // Adjust to match ELB shape
  cornerRadius = cornerRadius * 0.85;

  // Boundaries
  var xMin = origin.x - 1/2;
  var xMax = origin.x + 1/2;
  var yMin = origin.y - 1/2;
  var yMax = origin.y + 1/2;

  // Helpers
  var Path = Isomer.Path
  var Point = Isomer.Point
  var Shape = Isomer.Shape

  // Calculate path vertices & extrude
  elb.push(Shape.extrude(new Path([
    Point(xMax, yMin + cornerRadius, 0),
    Point(xMax, yMax - cornerRadius, 0),
    Point(xMax - cornerRadius, yMax, 0),
    Point(xMin + cornerRadius, yMax, 0),
    Point(xMin, yMax - cornerRadius, 0),
    Point(xMin, yMin + cornerRadius, 0),
    Point(xMin + cornerRadius, yMin, 0),
    Point(xMax - cornerRadius, yMin, 0),
  ]), 0.5), new Isomer.Color(195, 195, 195));

  // Circular logo on top
  elb.push(Path.Circle(new Point(origin.x, origin.y, 0.5), 0.33, 20),
    new Isomer.Color(72, 72, 72));

  return elb
}
