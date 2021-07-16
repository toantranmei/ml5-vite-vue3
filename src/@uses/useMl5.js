import ml5 from "ml5";
import { ref } from "@vue/runtime-core";

const useMl5 = () => {
  const error = ref(null);
  const isPending = ref(false);
  const model = ref(null);

  let detector = null;

  async function setObjectDetector(type) {
    model.value = null;
    isPending.value = true;
    detector = await ml5.objectDetector(type);
  }

  async function detect(target) {
    error.value = null;

    try {
      const results = await detector.detect(target);

      model.value = results;
    } catch (err) {
      console.error(err);
      error.value = err.message;
    } finally {
      isPending.value = false;
    }
  }

  return { model, error, isPending, detect, setObjectDetector };
};

export default useMl5;
