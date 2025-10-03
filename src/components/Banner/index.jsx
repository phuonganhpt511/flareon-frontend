const Banner = ({ title, image }) => {
  return (
    <div className="w-full rounded-lg overflow-hidden mb-6">
      <img src={image} alt={title} className="w-full h-48 md:h-64 object-cover" />
      <h2 className="text-2xl font-bold mt-2">{title}</h2>
    </div>
  )
}

export default Banner
