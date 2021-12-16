const db = {
  1: {
    name: "avocado",
    price: 10,
  },
  2: {
    name: "banana",
    price: 6,
  },
  3: {
    name: "apple",
    price: 3,
  },
};

function read(id, cb) {
  if (!db.hasOwnProperty(id)) {
    const err = Error("not found");
    err.code = "E_NOT_FOUND";

    setImmediate(() => cb(err));

    return;
  }

  setImmediate(() => cb(null, db[id]));
}

export default function fruitsModel() {
  return {
    read,
  };
}
