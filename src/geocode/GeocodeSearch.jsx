import { useEffect, useState } from "react";

function GeocodeSearch() {
  const [search, setSearch] = useState("");
  const [addresses, setAddresses] = useState({});

  useEffect(() => {
    if (search && search.length >= 3) {
      setAddresses([]);

      let ignore = false;
      async function startFetching() {
        try {
          const json = await fetch(
            `https://data.geopf.fr/geocodage/search?q=${search}`
          ).then((resp) => resp.json());
          if (!ignore) {
            setAddresses(json);
          }
        } catch (e) {
          setAddresses({});
        }
      }
      startFetching();
      return () => {
        ignore = true;
      };
    } else {
      setAddresses({});
    }
  }, [search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div>
      <h2>Geocode Search</h2>
      <input value={search} onChange={handleSearch} />
      <div>
        {!addresses || !addresses.features || !addresses.features.length ? (
          "Aucun résultat trouvé."
        ) : (
          <>
            <h3>{addresses.features.length} résultat(s)</h3>
            <div
              style={{ display: "flex", gap: "8px", flexDirection: "column" }}
            >
              {addresses.features.map((feature) => (
                <div
                  key={feature.properties.id}
                  className="address"
                  style={{ border: "1px red solid" }}
                >
                  {feature.properties.label}
                  {/*JSON.stringify(feature)*/}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default GeocodeSearch;
