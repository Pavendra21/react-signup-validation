import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ExcelList = () => {
  const [listData, setListData] = useState([]);

  useEffect(() => {
    const dataList = localStorage.getItem('signupData');
    if (dataList) {
      const parsedList = JSON.parse(dataList);
      setListData(parsedList);
    } else {
      setListData([]); // Explicitly set to empty array if no data
    }
  }, []);

  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">Login Details</h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Here are the login details of registered users.</p>
          </div>
          <div className="lg:w-2/3 w-full mx-auto overflow-auto">
            {listData.length === 0 ? ( // Check if listData is empty
            
              <p className="text-center font-bold text-black">!! No data available !!</p>
            ) : (
              <table className="table-auto w-full text-left whitespace-no-wrap">
                <thead>
                  <tr>
                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">S.NO</th>
                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">Name</th>
                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Email</th>
                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Phone</th>
                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">View</th>
                  </tr>
                </thead>
                <tbody>
                  {listData.map((person, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3">{index + 1}.</td>
                      <td className="px-4 py-3">{person.name}</td>
                      <td className="px-4 py-3">{person.email}</td>
                      <td className="px-4 py-3">{person.phone}</td>
                      <td className="w-10 text-center">
                        <Link to={`list/${index}`} className="bg-white text-black font-semibold py-1 px-2 border border-black rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black">View</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default ExcelList;
