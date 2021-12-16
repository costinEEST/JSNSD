import { Readable, Transform } from "stream";

export default function dataStream(
  sentence = `Today is ${new Date().toLocaleString("en-us", {
    weekday: "long",
  })}`,
  milliseconds = 1500
) {
  const readStream = Readable.from(sentence.split(" "));

  const writeStream = new Transform({
    transform(chunk, encoding, callback) {
      setTimeout(callback, milliseconds, null, chunk);
    },
  });

  return readStream.pipe(writeStream);
}
