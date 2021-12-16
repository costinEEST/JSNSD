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

function uid() {
  return (
    Object.keys(db)
      .sort((a, b) => a - b)
      .map(Number)
      .filter(Boolean)
      .pop() + 1
  );
}

function create(id, data, cb) {
  if (db.hasOwnProperty(id)) {
    const err = Error("resource exists");
    err.code = "E_RESOURCE_EXISTS";

    setImmediate(() => cb(err));

    return;
  }

  db[id] = data;
  setImmediate(() => cb(null, id));
}

function read(id, cb) {
  if (!db.hasOwnProperty(id)) {
    const err = Error("not found");
    err.code = "E_NOT_FOUND";

    setImmediate(() => cb(err));

    return;
  }

  setImmediate(() => cb(null, db[id]));
}

function del(id, cb) {
  if (!db.hasOwnProperty(id)) {
    const err = Error("not found");
    err.code = "E_NOT_FOUND";

    setImmediate(() => cb(err));
    return;
  }

  delete db[id];
  setImmediate(() => cb(null, id));
}

export default function fruitsModel() {
  return {
    create,
    del,
    read,
    uid,
  };
}
