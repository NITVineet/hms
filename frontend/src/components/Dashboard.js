import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartSimple, faUserGraduate, faFaceFrown, faFile, faUserGroup, faPlus } from '@fortawesome/free-solid-svg-icons';

function Dashboard() {
    
    const totalComplaints = 50;
    const solvedComplaints = 40;
    const pendingComplaints = 10;

    return (
        <div className="container mx-auto mt-8">
            <div className="flex flex-col md:flex-row gap-8">
                
                <div className='flex h-auto md:h-80 w-full md:w-1/4 mb-8 overflow-y-auto'>
                    <nav className='bg-gray-800 p-4'>
                        <div className='max-w-xl'>
                            <ul className='text-white'>
                                <li className='py-2 px-4 hover:bg-gray-700 cursor-pointer transition duration-300 rounded-md'> <FontAwesomeIcon className='mr-1' icon={faChartSimple} />Analytics</li>
                                <li className='py-2 px-4 hover:bg-gray-700 cursor-pointer transition duration-300 rounded-md'><FontAwesomeIcon className='mr-1' icon={faUserGraduate} />Students</li>
                                <li className='py-2 px-4 hover:bg-gray-700 cursor-pointer transition duration-300 rounded-md'><FontAwesomeIcon className='mr-1'  icon={faFaceFrown}  />Complaints</li>
                                <li className='py-2 px-4 hover:bg-gray-700 cursor-pointer transition duration-300 rounded-md'><FontAwesomeIcon className='mr-1' icon={faFile} /> Fee Details</li>
                                <li className='py-2 px-4 hover:bg-gray-700 cursor-pointer transition duration-300 rounded-md'><FontAwesomeIcon className='mr-1' icon={faUserGroup} />Workers Details</li>
                            </ul>
                        </div>
                    </nav>
                </div>

                
                <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full md:w-3/4">
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                            <h2 className="text-xl font-semibold mb-4">Occupancy Rate</h2>
                            <div className="flex items-center justify-center">
                                <div className="w-24 h-24 rounded-full border-4 border-gray-200 flex items-center justify-center hover:bg-gray-200 transition duration-300">
                                   
                                    <span className="text-3xl font-semibold text-gray-600">75%</span>
                                </div>
                            </div>
                            <p className="text-sm text-gray-500 mt-2">Currently occupied rooms</p>
                        </div>

                        <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                            <h2 className="text-xl font-semibold mb-4">Total Students</h2>
                            <div className="flex items-center justify-center">
                                <div className="w-24 h-24 rounded-full border-4 border-gray-200 flex items-center justify-center hover:bg-gray-200 transition duration-300">
                                    
                                    <span className="text-3xl font-semibold text-gray-600">120</span>
                                </div>
                            </div>
                            <p className="text-sm text-gray-500 mt-2">Students present</p>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-xl text-white font-semibold mb-4">Complaints</h2>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-gray-200 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                                <h3 className="text-lg font-semibold mb-2">Total Complaints</h3>
                                <div className="flex items-center justify-between">
                                    <p className="text-3xl font-semibold text-gray-600">{totalComplaints}</p>
                                    <span className="text-sm text-gray-500">+10% from last month</span>
                                </div>
                            </div>
                            <div className="bg-gray-200 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                                <h3 className="text-lg font-semibold mb-2">Solved Complaints</h3>
                                <div className="flex items-center justify-between">
                                    <p className="text-3xl font-semibold text-gray-600">{solvedComplaints}</p>
                                    <span className="text-sm text-gray-500">-5% from last month</span>
                                </div>
                            </div>
                            <div className="bg-gray-200 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                                <h3 className="text-lg font-semibold mb-2">Pending Complaints</h3>
                                <div className="flex items-center justify-between">
                                    <p className="text-3xl font-semibold text-gray-600">{pendingComplaints}</p>
                                    <span className="text-sm text-gray-500">+20% from last month</span>
                                </div>
                            </div>
                            
                        </div>
                        
                        <div className="flex justify-end mt-4">
                            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full transition duration-300">
                                <FontAwesomeIcon icon={faPlus} className="mr-1" />
                                Register New Complaint
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
