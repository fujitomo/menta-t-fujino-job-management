'use client';

import basicLoadingStyles from './cssModules/basicLoading.module.css';

export const BasicLoading = () => {
  return (
    <div className="bg-pj-white z-999 fixed inset-0 flex items-center justify-center bg-opacity-40">
      <div className={basicLoadingStyles.basicLoading} />
    </div>
  );
};
