import React from 'react';
import testOneImg from '../../assets/test_one.jpg';
import testTwoImg from '../../assets/test_two.jpg';
import testThreeImg from '../../assets/test_three.jpg';

const TesteCom = () => {
  return (
    <div className="test_wrapper py-4">
      <div className="container">
        <div className="test_row">
          <div className="row gy-3 justify-center">
            <div className="col-lg-4 col-md-6">
              <div
                className="test_imgBox flex  justify-center text-center h-64 rounded-md shadow-md"
                style={{
                  backgroundImage: `url(${testOneImg})`, // ✅ fixed
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              >
                <div className=" bg-opacity-50 p-3 rounded-md text-white">
                  <h5 className="text-2xl font-bold">Taste of</h5>
                 <h3>Fresh & Natural</h3>
                 <p>Weekend discount offer</p>
                 <button className='bg-green-600 text-white w-[100px] h-[30px] text-xs rounded-full  mt-2'>Shop now</button>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div
                className="test_imgBox flex  justify-center text-center h-64 rounded-md shadow-md"
                style={{
                  backgroundImage: `url(${testTwoImg})`, // ✅ fixed
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              >
                <div className=" bg-opacity-50 p-3 rounded-md text-white">
                  <h5 className="text-2xl font-bold">Taste of</h5>
                 <h3>Fish & Meat</h3>
                 <p>Weekend discount offer</p>
                 <button className='bg-green-600 text-white w-[100px] h-[30px] text-xs rounded-full  mt-2'>Shop now</button>
                </div>
              </div>
            </div>

             <div className="col-lg-4 col-md-6">
              <div
                className="test_imgBox flex  justify-center text-center h-64 rounded-md shadow-md"
                style={{
                  backgroundImage: `url(${testThreeImg})`, // ✅ fixed
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              >
                <div className=" bg-opacity-50 p-3 rounded-md text-white">
                  <h5 className="text-2xl font-bold">Taste of</h5>
                 <h3>Bread & Bakery</h3>
                 <p>Weekend discount offer</p>
                 <button className='bg-green-600 text-white w-[100px] h-[30px] text-xs rounded-full  mt-2'>Shop now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TesteCom;
