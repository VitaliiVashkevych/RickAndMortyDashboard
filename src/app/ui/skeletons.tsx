import "./skeletons.css";

export const Skeleton = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <>
      {arr.map((el) => (
        <div className="rect skeleton-content" key={el}>
          <div className="skeleton-image"></div>
          <div className="skeleton-title"></div>
        </div>
      ))}
    </>
  );
};
