{
  /* category selection switch component */
}

// import React from 'react';

// const InsightsSwitch = ({ onSelect }) => {
//   return (
//     <div>
//       <button onClick={() => onSelect('revenue')}>Revenue</button>
//       <button onClick={() => onSelect('admissions')}>Admissions</button>
//       <button onClick={() => onSelect('expenses')}>Expenses</button>
//     </div>
//   );
// };

// export default InsightsSwitch;

{
  /* data showcase insights component */
}

// import React, { useState, useEffect } from 'react';

// const InsightsShow = ({ category }) => {
//   const [data, setData] = useState({ daily: 0, weekly: 0, monthly: 0 });

//   useEffect(() => {
//     Fetch data based on the selected category (revenue, admissions, expenses)
//     Update the data state with fetched values
//     For demonstration purposes, let's set dummy data
//     if (category === 'revenue') {
//       setData({ daily: 100, weekly: 700, monthly: 3000 });
//     } else if (category === 'admissions') {
//       setData({ daily: 50, weekly: 300, monthly: 1200 });
//     } else if (category === 'expenses') {
//       setData({ daily: 30, weekly: 200, monthly: 800 });
//     }
//   }, [category]);

//   return (
//     <div>
//       <h2>{category.toUpperCase()}</h2>
//       <p>Daily: {data.daily}</p>
//       <p>Weekly: {data.weekly}</p>
//       <p>Monthly: {data.monthly}</p>
//     </div>
//   );
// };

// export default InsightsShow;

{
  /* insights screen */
}

//import React, { useState } from 'react';
// import InsightsSwitch from './InsightsSwitch';
// import InsightsShow from './InsightsShow';

// const InsightsScreen = () => {
//   const [selectedCategory, setSelectedCategory] = useState('revenue');

//   const handleCategorySelect = (category) => {
//     setSelectedCategory(category);
//   };

//   return (
//     <div>
//       <div>
//         <InsightsSwitch onSelect={handleCategorySelect} />
//       </div>
//       <div>
//         <InsightsShow category={selectedCategory} />
//       </div>
//     </div>
//   );
// };

// export default InsightsScreen;
