import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import parse from "autosuggest-highlight/parse";
import { debounce } from "@mui/material/utils";
import "./PlaceSelect.css";
import {getAddressDetails} from "../../utils/string";


// This key was created specifically for the demo in mui.com.
// You need to create a new one for your application.
const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

function loadScript(src, position, id) {
  if (!position) {
    return;
  }
  if (typeof window === 'object') {
  const script = document.createElement("script"),
    div = document.createElement("div");
  script.setAttribute("async", "");
  script.setAttribute("id", id);
  script.src = src;
  position.appendChild(script);

  div.setAttribute("id", "map");
  let bodyComponent = document.querySelector("body");
  bodyComponent.appendChild(div);
  }
}

const autocompleteService = { current: null };
const placesService = { current: null };

export default function PlaceSelect(props) {
  const [value, setValue] = React.useState(props.value || null);
  const { onChange, error } = props;
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState([]);
  const loaded = React.useRef(false);

  let map;

  if (typeof window !== "undefined" && !loaded.current) {
    window.initMap = () => {
      const sydney = new window.google.maps.LatLng(-33.867, 151.195);
      if (typeof window === 'object') {
      map = new window.google.maps.Map(document.getElementById("map"), {
        center: sydney,
        zoom: 15,
      });
    }

      placesService.current = new window.google.maps.places.PlacesService(map);
    };
    if (typeof window === 'object') {

    if (!document.querySelector("#google-maps")) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&loading=async&callback=initMap`,
        document.querySelector("head"),
        "google-maps"
      );
    }
  }
    loaded.current = true;
  }

  const fetch = React.useMemo(
    () =>
      debounce((request, callback) => {
        autocompleteService.current.getPlacePredictions(
            { ...request, componentRestrictions: { country: 'gb' }, types: ['postal_code'] },
            callback
        );
      }, 400),
    []
  );

  React.useEffect(() => {

    const getPostcode = async (option) => {
      if (typeof option === "string") return option;
      if (!placesService.current) {
        if (!map) {
          let sydney = new window.google.maps.LatLng(-33.867, 151.195);
          // eslint-disable-next-line react-hooks/exhaustive-deps
          if (typeof window === 'object') {
          map = new window.google.maps.Map(document.getElementById("map"), {
            center: sydney,
            zoom: 15,
          });
        }
        }
        placesService.current = new window.google.maps.places.PlacesService(
          map
        );
      }
      if (!option?.place_id) {
        return undefined;
      }

      return new Promise((resolve, reject) => {
        placesService.current.getDetails(
          {
            placeId: option.place_id,
            fields: ["address_components"],
          },
          (place, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
              const addressComponents = place.address_components;
              const addressList = option.description.split(",");
              let address = "";
              if (addressList.length > 2) {
                address = addressList.reverse().slice(0, 3).reverse().join(",");
              } else {
                address = addressList.join(",");
              }
              for (let i = 0; i < addressComponents.length; i++) {
                const component = addressComponents[i];
                if (component.types.indexOf("postal_code") !== -1) {
                  address = component.long_name;
                }
              }
              resolve(address);
            } else {
              console.error("Place details request failed due to ", status);
              resolve(undefined);
            }
          }
        );
      });
    };

    let active = true;
    if (!autocompleteService.current && window.google) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }
    fetch({ input: inputValue }, async (results) => {
      if (active) {
        let newOptions = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        await Promise.all(
          newOptions.map(async (option, index) => {
            newOptions[index].postcode = await getPostcode(option);
            if (!newOptions[index].postcode) {
              newOptions[index].postcode = option.description;
            }
          })
        );

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  const getLocation = (newValue) => {
    if (!placesService.current) {
      if (!map) {
        let sydney = new window.google.maps.LatLng(-33.867, 151.195);
        if (typeof window === 'object') {
        map = new window.google.maps.Map(document.getElementById("map"), {
          center: sydney,
          zoom: 15,
        });
      }
      }
      placesService.current = new window.google.maps.places.PlacesService(map);
    }
    if (!newValue?.place_id) {
      onChange({
        target: {
          value: {
            placeId: newValue?.place_id,
            addressDetails: {},
            postcode: "",
            latitude: -1,
            longitude: -1,
            error: 'Please input a valid postcode'
          },
        },
      });
      return undefined;
    }

    placesService.current.getDetails(
      {
        placeId: newValue.place_id,
        fields: ["name", "geometry", "formatted_address", "address_component"],
      },
      async (place, status) => {
        let newError = null;
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          const location = place.geometry.location;
          const addressComponents = place.address_components;
          const addressList = newValue.description.split(",");
          let addressDetails = getAddressDetails(place);
          let address = "";
          if (addressList.length > 2)
            address = addressList.reverse().slice(0, 3).reverse().join(",");
          else address = addressList.join(",");
          let postcode = address;
          let hasPostcode = false, isUK = false
          for (let i = 0; i < addressComponents.length; i++) {
            const component = addressComponents[i];
            if (component.types.indexOf("country") !== -1 && component.long_name === 'United Kingdom') {
              isUK = true
            }
            if (component.types.indexOf("postal_code") !== -1) {
              postcode = component.long_name;
              hasPostcode = true
            }
          }
          if(!isUK) newError = 'Please input only UK postcode'
          if(!hasPostcode) newError = 'Please input a valid postcode'
          onChange({
            target: {
              value: {
                placeId: newValue.place_id,
                addressDetails: addressDetails,
                address,
                postcode,
                latitude: location.lat(),
                longitude: location.lng(),
                error: newError
              },
            },
          });
          // Use the location for whatever you need
        } else {
          console.error("Place details request failed due to ", status);
          onChange({
            target: {
              value: {
                placeId: newValue.place_id,
                addressDetails: {},
                postcode: "",
                latitude: -1,
                longitude: -1,
                error: 'Place details request failed'
              },
            },
          });
          return undefined;
        }
      }
    );
  };

  return (
    <Autocomplete
      id="google-map-demo"
      className="postcode-select"
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.postcode
      }
      style={{ color: 'pink' }}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      noOptionsText="No locations"
      onChange={(event, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
        getLocation(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} fullWidth error={error} label="Postcode" placeholder="e.g. N10 7GA" value={value} />
      )}
      renderOption={(props, option) => {
        const matches =
          option.structured_formatting.main_text_matched_substrings || [];

        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match) => [match.offset, match.offset + match.length])
        );

        return (
          <li {...props}>
            <Grid container alignItems="center">
              {/*<Grid item sx={{ display: "flex", width: 44 }}>*/}
              {/*  /!*<LocationOnIcon sx={{ color: "text.secondary" }} />*!/*/}
              {/*</Grid>*/}
              <Grid
                item
                sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}
              >
                {parts.map((part, index) => (
                  <Box
                    key={index}
                    component="span"
                    sx={{ fontWeight: part.highlight ? "bold" : "regular" }}
                  >
                    {part.text}
                  </Box>
                ))}
                <Typography variant="body2" color="text.secondary">
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
}
