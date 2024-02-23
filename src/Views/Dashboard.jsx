import React, { useEffect, useState } from 'react';

const Dashboard = () => {
    const [userDetails, setUserDetails] = useState({});
    const [poems, setPoems] = useState([]);
    const [poem, setPoem] = useState('');
    const [author, setAuthor] = useState('');

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await fetch('http://panel.mait.ac.in:8001/auth/user-details/', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    },
                });
                const data = await response.json();
                setUserDetails(data);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        const fetchPoems = async () => {
            try {
                const response = await fetch('http://panel.mait.ac.in:8001/poem/get/', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    },
                });
                const data = await response.json();
                setPoems(data);
            } catch (error) {
                console.error('Error fetching poems:', error);
            }
        };

        fetchUserDetails();
        fetchPoems();
    }, []);

    const handlePoemSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://panel.mait.ac.in:8001/poem/create/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
                body: JSON.stringify({ poem, author }),
            });

            const data = await response.json();
            if (response.ok) {
                window.location.reload();
            } else {
                console.error('Poem submission failed:', data.message);
            }
        } catch (error) {
            console.error('Error during poem submission:', error);
        }
    };

    return (
        <div className='bg-slate-600 text-white p-8'>
            {localStorage.getItem('access_token') ? (
                <>
                    <h2 className='text-5xl text-center text-white font-boldhead'>Dashboard</h2>
                    <div className='grid grid-cols-2'>
                        <div>
                            <h3 className='font-semibold font-thinspaced tracking-widest text-4xl mt-5'>User Details</h3>
                            <div className='border-2 border-slate-900 inline-block m-2 p-5 rounded-3xl bg-slate-300'>
                                <p className='text-black text-xl font-semibold capitalize '><span className='text-slate-900 text-sm mb-3'>Name:</span> {userDetails.name}</p>
                                <p className='text-black text-xl font-semibold '><span className='text-slate-900 text-sm mb-3'>Email:</span> {userDetails.email}</p>
                            </div>
                        </div>
                        <div>
                            <h2 className='font-semibold font-thinspaced tracking-widest text-4xl mt-5 text-center mb-2'>Something on your mind?</h2>
                            <form onSubmit={handlePoemSubmit}>
                                <div className='flex justify-center'>

                                    <label className='text-black text-xl font-semibold capitalize '>Poem:</label>
                                    <input value={poem} onChange={(e) => setPoem(e.target.value)} className='border-2 border-slate-900 inline-block p-2 rounded-3xl bg-slate-300 text-black' required />
                                    <label className='text-black text-xl font-semibold capitalize ml-4'>Author:</label>
                                    <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className='border-2 border-slate-900 inline-block p-2 rounded-3xl bg-slate-300 text-black' required />
                                </div>
                                <div className='flex justify-center'>
                                <button type="submit" className='text-lg font-semibold border-2 border-black bg-slate-300 p-3 m-2 rounded-xl text-black'>Add Poem</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div>
                        <h3 className='font-semibold font-thinspaced tracking-widest text-4xl mt-5 '>Poems</h3>
                        <div className='grid grid-cols-3'>
                            {poems.map((poem) => (
                                <div key={poem.id} className='border-2 border-slate-900 m-2 p-5 rounded-3xl bg-slate-300 '>
                                    <p className='text-black text-xl font-semibold capitalize '><span className='text-slate-900 text-sm mb-3'>Poem: </span>{poem.poem}</p>
                                    <p className='text-black text-xl font-semibold capitalize '><span className='text-slate-900 text-sm'>Author: </span>{poem.author}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <div className='grid place-content-center h-[50vh]'>
                    <h2 className='text-8xl font-boldhead text-center text-white underline capitalize'>Login first to view your dashboard</h2>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
