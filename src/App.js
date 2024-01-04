import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { InputGroup, FormControl, Button, Row,  Card } from 'react-bootstrap'


const Item = ({ item, resetItem }) => {
  const { title, description, address, area, bathrooms, bedrooms, city, country, created_at, exterior,  interior, price, property_lot_size, property_size, state, status, type, url } = item

  return (
    <div style={{ width: '90%', margin: 'auto', textAlign: 'left' }}>
      <hr />
      <Button onClick={resetItem} variant="warning" className="d-flex"><b>Go Back</b></Button>
      <h3 className="mt-4">{title}</h3>
      {description !== "" && <h5>{description}</h5>}
      {address !== "" && <h5>Address: {address}</h5>}
      {area !== "" && <h5>Area: {area}</h5>}
      {bathrooms !== "" && <h5>Bathrooms: {bathrooms}</h5>}
      {bedrooms !== "" && <h5>Bedrooms: {bedrooms}</h5>}
      {exterior !== "" && <h5>Exterior: {exterior}</h5>}
      {interior !== "" && <h5>Interior: {interior}</h5>}
      {price !== "" && <h5>Price: {price}</h5>}
      {property_lot_size !== "" && <h5>Property Lot Size: {property_lot_size}</h5>}
      {property_size !== "" && <h5>Property Size: {property_size}</h5>}
      {state !== "" && <h5>State: {state}</h5>}
      {status !== "" && <h5>Status: {status}</h5>}
      {type !== "" && <h5>Type: {type}</h5>}
      {city !== "" && <h5>City: {city}</h5>}
      {country !== "" && <h5>Country: {country}</h5>}
      {url !== "" && <h5>URL: <a href={url}>{url}</a></h5>}
      {created_at !== "" && <h5>Created At: {created_at}</h5>}
    </div>
  )



}

const ITEMS_PER_PAGE = 20

const App = () => {

  const [text, setText] = useState('');
  const [location, setLocation] = useState('');
  const [site, setSite] = useState('');
  // const [location, setLocation] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [items, setItems] = useState([])
  const [currentItem, setCurrentItem] = useState(false)
  const [pageCounter, setPageCounter] = useState(1)

  const resetData = () => {
    setIsSearching(true)
    setItems([])
    setPageCounter(1)
  }
  const fetchData = async () => {
    resetData()
    const result = await axios.get(`/.netlify/functions/search?text=${text}&location=${location}&site=${site}`)
    const { items} = result.data
    setItems(items)
    setIsSearching(false)
  }

  const onChangeText = (ev) => setText(ev.target.value)
  const onChangeLocation = (ev) => setLocation(ev.target.value)
  const onChangeSite= (ev) => setSite(ev.target.value)

  const itemClick = (item) => setCurrentItem(item)
  const resetItem = () => setCurrentItem(false)

  const getItems = () => {
    return items.slice(0, ITEMS_PER_PAGE * pageCounter)
  }

  const incrementCounter = () => setPageCounter(pageCounter + 1)

  return (
    <div className="App py-4">
      {currentItem ?
        <Item resetItem={resetItem} item={currentItem} />
        :
        <>
          <div className="bg-gray-200 p-2">
            <InputGroup className="mb-3 w-50 mx-auto">
              <FormControl
                aria-describedby="basic-addon2"
                type="text"
                name="text"
                placeholder="search for properties..."
                value={text}
                onChange={onChangeText}
                className="bg-white p-2 w-3/4 outline-none px-3"
               
              />

            </InputGroup>
            <InputGroup className="mb-3 w-50 mx-auto d-flex" style={{gap:'5px'}}>
              <FormControl
                aria-describedby="basic-addon2"
                type="text"
                name="text"
                placeholder="Address, City, or Country"
                value={location}
                onChange={onChangeLocation}
                className="bg-white p-2 w-3/4 outline-none px-3"
              />

              <FormControl
                aria-describedby="basic-addon2"
                type="text"
                name="text"
                placeholder="Site Name"
                value={site}
                onChange={onChangeSite}
                className="bg-white p-2 w-3/4 outline-none px-3"
              />

            </InputGroup>


            <Button onClick={fetchData} variant="warning" id="button-addon2">
              <b>Search</b>
            </Button>
          </div>

          {isSearching && <div class="my-5">
            <img alt='loader' src="assets/loader.gif" height="100" width="100" />
          </div>}


          {
            (items.length === 0 && !isSearching) && <h3>No Search Results.</h3>
          }

          <Row className="items-container g-3 justify-content-around mx-auto" style={{ width: '90%' }}>
          <hr />
          <hr />
    
            {
              getItems().map((item, idx) => {
                let { description } = item;
                description = description.length > 100 ? description.substring(0, 100) + '...' : description;
                return <Card className="p-2" style={{ width: '18rem', borderRadius: '10px' }}>
                  <Card.Img variant="top" src="assets/house.png" />
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>
                      {description}
                    </Card.Text>
                    <Button onClick={() => itemClick(item)} variant="outline-success">Show Complete Info</Button>
                  </Card.Body>
                </Card>
              })
            }

            {(!isSearching && items.length !== 0 && getItems().length !== items.length) && <Button onClick={incrementCounter} variant="success" className="w-50 mx-auto">Show More Properties</Button>}

          </Row>
        </>
      }

    </div>
  );
}

export default App;
