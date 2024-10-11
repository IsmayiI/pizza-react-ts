import ContentLoader from "react-content-loader"

export const Skeleton = () => (
   <ContentLoader
      className="pizza-block"
      speed={2}
      width={280}
      height={464}
      viewBox="0 0 280 464"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
   >
      <circle cx="134" cy="124" r="122" />
      <rect x="0" y="270" rx="10" ry="10" width="280" height="27" />
      <rect x="0" y="315" rx="10" ry="10" width="280" height="85" />
      <rect x="2" y="430" rx="10" ry="10" width="90" height="27" />
      <rect x="127" y="420" rx="15" ry="15" width="150" height="44" />
      <rect x="254" y="429" rx="0" ry="0" width="4" height="6" />
   </ContentLoader>
)
