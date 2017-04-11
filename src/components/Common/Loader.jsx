import React from 'react';

const Loader = () => (
  <div className="loader modal">
    <div className="card" role="dialog">
            <div className="card-block">
              <div className="ring-5">
              <div className="ring-4">
              <div className="ring-3">
                <div className="ring-2">
                  <div className="ring-1"></div>
              </div>
            </div>
          </div>
        </div>
            <span>Loading</span>
            </div>
    </div>
  </div>
);

export default Loader;