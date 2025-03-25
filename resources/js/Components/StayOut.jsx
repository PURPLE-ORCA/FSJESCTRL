import { TranslationContext } from '@/context/TranslationProvider';
import Layout from '@/Layouts/Layout';
import React, { useContext } from 'react'

const StayOut = () => {
    const { translations } = useContext(TranslationContext);
    
  return (
      <Layout>
          <div className="text-center text-2xl font-bold mx-4 my-20">
              {translations.no_permission}
          </div>
      </Layout>
  );
}

export default StayOut
