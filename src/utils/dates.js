import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/es";

dayjs.extend(relativeTime);
dayjs.locale("es");

export const relativeDate = (date) => {
  const result = dayjs(date).fromNow();

  return result;
};

export const formatDate = (date) => {
  const result = dayjs(date).format("dddd, D [de] MMMM [del] YYYY");

  return result;
};