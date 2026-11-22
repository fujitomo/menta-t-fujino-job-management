type PlainObject = Record<string, unknown>;

type DeepMergeInput<T> = ReadonlyArray<Partial<T>>;

const isPlainObject = (value: unknown): value is PlainObject =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const mergeArrays = (target: unknown[], source: unknown[]) => {
  const result = [...target];

  source.forEach((item) => {
    if (isPlainObject(item) && 'name' in item) {
      const index = result.findIndex(
        (existing) =>
          isPlainObject(existing) &&
          'name' in existing &&
          (existing as { name?: unknown }).name === item.name,
      );

      if (index !== -1) {
        result[index] = mergeValues(result[index], item);

        return;
      }
    }

    const alreadyExists = result.some(
      (existing) => JSON.stringify(existing) === JSON.stringify(item),
    );

    if (!alreadyExists) {
      result.push(item);
    }
  });

  return result;
};

const mergeValues = (targetValue: unknown, sourceValue: unknown): unknown => {
  if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
    return mergeArrays(targetValue, sourceValue);
  }

  if (isPlainObject(targetValue) && isPlainObject(sourceValue)) {
    return mergeObjects(targetValue, sourceValue);
  }

  return sourceValue;
};

const mergeObjects = (target: PlainObject, source: PlainObject) => {
  const result: PlainObject = { ...target };

  Object.entries(source).forEach(([key, value]) => {
    if (value === undefined) {
      return;
    }

    const current = result[key];

    if (current === undefined) {
      if (isPlainObject(value)) {
        result[key] = mergeObjects({}, value);

        return;
      }

      if (Array.isArray(value)) {
        result[key] = [...value];

        return;
      }

      result[key] = value;

      return;
    }

    result[key] = mergeValues(current, value);
  });

  return result;
};

export const deepMerge = <T>(...sources: DeepMergeInput<T>): T =>
  sources.reduce<T>((accumulator, current) => {
    if (!isPlainObject(current)) {
      return accumulator;
    }

    return mergeObjects(
      accumulator as PlainObject,
      current as PlainObject,
    ) as T;
  }, {} as T);
