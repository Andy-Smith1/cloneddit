export const formatDate = (dateString) => {
  const slicedString = dateString.slice(0, 10).split("-");
  return slicedString.reverse().join("/");
};
