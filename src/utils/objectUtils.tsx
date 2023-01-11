import { isObj } from "./filterUtils";

export const excludeObjFields = (fields: string[], object: { [key: string]: any }) => {

    let returnObject: { [key: string]: any } = {};

    Object.entries(object).forEach(([key, value]) => {

        if (![...fields].includes(key)) {

            returnObject[key] = value;
        }

    });

    return returnObject;
}

export type primitiveObj = { [key: string]: string | number | undefined };

export const getBiggerObject = (obj1: primitiveObj, obj2: primitiveObj) => {

  if (isObj(obj1) && isObj(obj2)) {

    const lengthOfObject1 = Object.keys(obj1).length;

    const lengthOfObject2 = Object.keys(obj2).length;

    if (lengthOfObject1 > lengthOfObject2) {

      return [obj1, obj2];

    }

    if (lengthOfObject2 > lengthOfObject1) {

      return [obj2, obj1];

    }

    return [obj1, obj2];

  };

  return ([{} as primitiveObj, {} as primitiveObj])

}

export const shallowCompare = (obj1: primitiveObj, obj2: primitiveObj) => {

  try {

    if (isObj(obj1) && isObj(obj2)) {

      let equal = true;

      const [biggerObject, smallerObject] = getBiggerObject(obj1, obj2);

      Object.entries(biggerObject).forEach(([key, value]) => {

        if (!smallerObject?.[key]) {

          equal = false;

          return;

        }

        if (smallerObject?.[key] !== value) {

          equal = false;

        }

      });

      return equal;

    }

    return true;

  } catch (err: any) {

    return true;

  }

}