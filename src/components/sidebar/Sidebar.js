import React, { useState } from 'react'
import Header from './header/Header'
import Notification from './notifications/Notification';
import Search from './search/Search';
import Conversation from './conversation/Conversation';
import SearchList from './search/SearchList';

export default function Sidebar() {
  const [searchResult, setSearchResult] = useState([]);
  let searchLength = 0;
  try {
    if (searchResult) {
      if (searchResult.length > 0) {
        searchLength = searchResult.length;
      }
    }
  } catch (err) { console.log(err) }
  
  return (
    <div className="flex0030 w-full md:max-w-[50%] sm:max-w-full h-full select-none">
      {/*sidebar header  */}
      <Header />
      {/* notification */}
      <Notification />
      {/* search */}
      <Search searchResult={searchResult} setSearchResult={setSearchResult} />
      {/* conversations */}
      {searchLength > 0 ? (
        <>
          <SearchList searchResult={searchResult} setSearchResult={setSearchResult}/>
        </>
      ) : (
        <>
          <Conversation />

        </>
      )}
    </div>
  )
}
