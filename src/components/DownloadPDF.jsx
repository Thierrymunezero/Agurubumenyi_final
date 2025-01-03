import React, { useState } from 'react';

function DownloadPDF() {
  const pdf_link = "https://res.cloudinary.com/dwroisx6j/raw/upload/v1735898567/nnlezrljod7suhjiru8a";
  
  const [downloaded, setDownloaded] = useState(false); // State to track download status
  const welcomeText = "Downloadinga igitabo wige kandi unatsinde byoroshye!";

  const handleDownload = () => {
    fetch(pdf_link)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Amategeko.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        setDownloaded(true); // Set download success
        setTimeout(() => setDownloaded(false), 3000); // Hide the alert after 3 seconds
      })
      .catch(error => {
        console.error('Error downloading the file:', error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-12 sm:py-24 md:py-32 lg:py-40">
      <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-2xl w-full text-center space-y-6">
        <h1 className="text-4xl font-extrabold text-teal-700">
          {welcomeText}
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed">
          Twishimiye kubaha igitabo cy'amategeko y'umuhanda kugirango kibafashe kwiga neza. Kanda buto iri hasi udownloadinge Igitabo. Igitabo kiguha amakuru yose ukeneye kugirango utsinde ikizamini.

        </p>
      </div>

      <div className="mt-10">
        <button
          onClick={handleDownload}
          className="bg-teal-700 text-white py-4 px-10 rounded-full shadow-xl hover:bg-orange-500 focus:outline-none focus:ring-4 focus:ring-teal-300 transform transition-all duration-300 ease-in-out hover:scale-105"
        >
          Kanda hano udownloadinge Igitabo 
        </button>
      </div>

      {downloaded && (
        <div className="mt-6 p-4 max-w-sm w-full bg-green-100 border-l-4 border-green-500 text-green-700 shadow-lg rounded-md transition-all duration-300">
          <p className="text-sm font-semibold">Kudownloadinga byagenze neza.</p>
        </div>
      )}
    </div>
  );
}

export default DownloadPDF;