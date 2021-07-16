function createCanvas({ name, height, target, width }) {
  const canvas = document.createElement("canvas");

  canvas.id = name;
  canvas.width = width;
  canvas.height = height;
  canvas.style.backgroundColor = "pink";

  const parent = document.querySelector(target);

  parent.appendChild(canvas);

  return canvas;
}

function loadImage({ src, width, height }) {
  return new Promise((resolve) => {
    let image = null;

    image = new Image(width, height);

    image.width = width;
    image.height = height;
    image.crossOrigin = "anonymous";
    image.src = src;

    image.addEventListener("load", function () {
      resolve(image);
    });
  });
}

const useCanvas = () => {
  return { createCanvas, loadImage };
};

export default useCanvas;
