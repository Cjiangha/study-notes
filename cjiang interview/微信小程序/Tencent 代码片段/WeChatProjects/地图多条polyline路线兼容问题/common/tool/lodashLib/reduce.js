function keys(object) {
  return isArrayLike(object) ? [] : Object.keys(Object(object));
}

function isArrayLike(value) {
  return value != null && typeof value !== "function" && value.length;
}

function baseFor(object, iteratee, keysFunc) {
  const iterable = Object(object);
  const props = keysFunc(object);
  let { length } = props;
  let index = -1;

  while (length--) {
    const key = props[++index];

    if (iteratee(iterable[key], key, iterable) === false) {
      break;
    }
  }

  return object;
}

function baseForOwn(object, iteratee) {
  return object && baseFor(object, iteratee, keys);
}

function baseEach(collection, iteratee) {
  if (collection == null) {
    return collection;
  }

  if (!isArrayLike(collection)) {
    return baseForOwn(collection, iteratee);
  }

  const length = collection.length;
  const iterable = Object(collection);
  let index = -1;

  while (++index < length) {
    if (iteratee(iterable[index], index, iterable) === false) {
      break;
    }
  }

  return collection;
}

function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
  eachFunc(collection, (value, index) => {
    accumulator = initAccum
      ? ((initAccum = false), value)
      : iteratee(accumulator, value, index, collection);
  });
  return accumulator;
}

export default function reduce(collection, iteratee, accumulator) {
  try {
    if (Array.isArray(collection)) {
      return collection.reduce(iteratee, accumulator);
    } else {
      const initAccum = arguments.length < 3;
      return baseReduce(collection, iteratee, accumulator, initAccum, baseEach);
    }
  } catch (err) {}
}
