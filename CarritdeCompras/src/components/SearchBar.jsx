export default function SearchBar({selectedCategory, handleCategoryChange, categories,searchTerm, handleSearchChange}) {
  return (
    <div className="d-flex align-items-center justify-content-start mt-5 mb-5" style={{ gap: "20px" }}>
          <select
            className="form-select"
            style={{
              width: "200px",
              height: "50px",
              backgroundColor: "white",
              color: "black",
              borderColor: "#1f6feb",
              boxShadow: "0 0 10px rgba(31, 111, 235, 0.5)",
            }}
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">Todas las categorías</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          
          <div className="d-flex align-items-center" style={{ position: "relative", width: "1500px" }}>
            <input
              type="text"
              className="form-control"
              style={{
                width: "100%",
                height: "50px",
                backgroundColor: "white",
                color: "black",
                borderColor: "#1f6feb",
                boxShadow: "0 0 10px rgba(31, 111, 235, 0.5)",
                paddingRight: "50px",
              }}
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <img
              src="./../public/img/icon-busqueda.svg"
              alt="Buscar"
              className="position-absolute"
              style={{
                right: "10px",
                width: "48px",
                height: "auto",
              }}
            />
          </div>
        </div>
  )
}   