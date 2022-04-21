/**
 * 处理路线中的交通状态，也就是路线的颜色
 * @param {*} trafficStatus 交通状态数据，用来标识路的颜色
 * @param {*} lineType 路线类型 other（备选路线）
 */
function getPolylineColorListFn(trafficStatus, lineType = "") {
  if (!trafficStatus || !trafficStatus.length) {
    return undefined;
  }

  const [lastColor, lastIndex, ...other] =
    trafficStatus[trafficStatus.length - 1].split(",");
  const patchTrafficStatus = `${lastColor},${
    Number(lastIndex) + 1
  },${other.join(",")}`; // 补全最后一个区间路况

  const colorList = [...trafficStatus, patchTrafficStatus].reduce(
    (pre, next, index, all) => {
      const nextArr = next.split(",");
      const color = nextArr[0];
      const startIndex = Number(nextArr[1]);
      let endIndex = 0;

      if (all[index + 1]) {
        endIndex = Number(all[index + 1].split(",")[1]);
      }

      let rangeList = [];

      if (endIndex > startIndex) {
        rangeList = Array(endIndex - startIndex).fill(
          lineType === "other" ? getColorOther(color) : getColor(color)
        );
      }

      return [...pre, ...rangeList];
    },
    []
  );
  return colorList;
}
/**
 * 根据路线类型获取道路拥挤程度的颜色
 * @param {*} type 路线类型
 */

function getColor(type) {
  const cMap = {
    3: "#00C96D",
    // 绿
    4: "#FAD300",
    // 黄
    5: "#EC0E3E",
    // 红
    6: "#A8090B", // 深红
  };
  return cMap[type] || "#00C96D";
}
/**
 * 根据路线类型获取道路拥挤程度的颜色(备选路线)
 * @param {*} type 路线类型
 */

function getColorOther(type) {
  const cMap = {
    3: "#9BD3C5",
    4: "#FBD6B5",
    5: "#E1B2BF",
    6: "#D097A4",
  };
  return cMap[type] || "#9BD3C5";
}
/**
 * 处理路线数据
 * @param {*} point2ds 未处理的线数据，
 */

function getPolylinePointsFn(point2ds) {
  const points = point2ds.reduce((pre, next) => {
    const polylineLatlngs = next.split(",");

    if (polylineLatlngs.length === 2) {
      const point = {
        latitude: Number(polylineLatlngs[1]),
        longitude: Number(polylineLatlngs[0]),
      };
      pre.push(point);
    }

    return pre;
  }, []);
  return points;
}
/**
 * 获取还有没行驶的路线数据
 * @param {*} point2ds 待处理的路线数据
 * @param {*} index
 */

function getPoint2dsToBeDrivedFn(point2ds, index) {
  const point2dsToBeDrived = point2ds.slice(index + 1);
  return point2dsToBeDrived;
}
/**
 * 路况信息根据currentIndex截取
 * @param {Array} trafficStatus
 * @param {Number} currentIndex
 */

function getTrafficStatusToBeDrivedFn(trafficStatus, currentIndex) {
  const targetItemIndex = trafficStatus.findIndex((item) => {
    const itemArr = item.split(",");
    const lineIndex = Number(itemArr[1]);
    return lineIndex >= currentIndex;
  });

  if (targetItemIndex < 0) {
    return trafficStatus;
  }

  const resTrafficStatus = [];
  trafficStatus.slice(targetItemIndex).forEach((item) => {
    const itemArr = item.split(",");

    if (itemArr[1] !== undefined) {
      itemArr[1] -= currentIndex;
    }

    resTrafficStatus.push(itemArr);
  });

  if (resTrafficStatus[0] && resTrafficStatus[0][1] > 0) {
    const prevItem = trafficStatus[targetItemIndex - 1];

    if (prevItem) {
      const prevItemArr = prevItem.split(",");
      prevItemArr[1] = 0;
      resTrafficStatus.unshift(prevItemArr);
    }
  }

  return resTrafficStatus.map((item) => item.join(","));
}

export {
  getPolylineColorListFn,
  getPolylinePointsFn,
  getColor,
  getPoint2dsToBeDrivedFn,
  getTrafficStatusToBeDrivedFn,
};
