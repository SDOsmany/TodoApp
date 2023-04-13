// frontend/components/Header.tsx

import React from 'react';

const Header = () => {
  return (
    <header className="bg-blue-500 py-4 text-white">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold">Todo List</h1>
      </div>
    </header>
  );
};

export default Header;