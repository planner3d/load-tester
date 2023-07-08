import React, {useState} from 'react';

const Header = ({setTestResult}) => {

    const [testUrl, setTestUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const runTest = async () => {
        setLoading(true);
        const response = await fetch(`https://backend.1531423-carruners.twc1.net/load_test?url=${testUrl}`);
        const result = await response.text();
        setLoading(false);
        setTestResult(result);
    }

    return (
        <header className="load-tester__header">
            <section className="load-tester__header-instruments">
                <svg className="load-tester__header-run-test"
                     onClick={runTest}
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 16 16">
                    <path
                        d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"
                    />
                </svg>
                <input type="text" onChange={e => setTestUrl(e.target.value)}/>
                {loading && <span className="load-tester__header-loading">Loading...</span>}
            </section>
        </header>
    );
};

export default Header;