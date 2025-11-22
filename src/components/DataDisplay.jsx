import { useState, useEffect } from 'react';

export default function DataDisplay() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedPapers, setExpandedPapers] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://uvddanzqgxbmjzwgstau.supabase.co/storage/v1/object/public/json-files_1/professors_no_college_grouped.json');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                setData(jsonData.student || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const togglePaper = (paperId) => {
        setExpandedPapers(prev => ({
            ...prev,
            [paperId]: !prev[paperId]
        }));
    };

    if (loading) return <div className="text-center p-4">Loading professor data...</div>;
    if (error) return <div className="alert alert-danger m-3">Error: {error}</div>;

    return (
        <div className="container-fluid p-3">
            <h4 className="mb-4">Professor Research Directory</h4>

            {data.map((school, schoolIdx) => (
                <div key={schoolIdx} className="mb-5">
                    <h5 className="text-primary mb-3">
                        <i className="bi bi-building"></i> {school.school}
                    </h5>

                    {school.departments?.map((dept, deptIdx) => (
                        <div key={deptIdx} className="ms-3 mb-4">
                            <h6 className="text-secondary mb-3">
                                <i className="bi bi-folder"></i> {dept.department}
                            </h6>

                            {dept.professors?.map((prof, profIdx) => (
                                <div key={profIdx} className="card mb-3 shadow-sm">
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            <i className="bi bi-person-circle"></i> {prof.name}
                                        </h5>

                                        <div className="mb-3">
                                            {prof.email && (
                                                <a href={`mailto:${prof.email}`} className="btn btn-sm btn-outline-primary me-2 mb-2">
                                                    <i className="bi bi-envelope"></i> Email
                                                </a>
                                            )}
                                            {prof.linkedin && (
                                                <a href={prof.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary me-2 mb-2">
                                                    <i className="bi bi-linkedin"></i> LinkedIn
                                                </a>
                                            )}
                                            {prof.google_scholar && (
                                                <a href={prof.google_scholar} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary me-2 mb-2">
                                                    <i className="bi bi-mortarboard"></i> Google Scholar
                                                </a>
                                            )}
                                        </div>

                                        {prof.recent_work && prof.recent_work.length > 0 && (
                                            <div>
                                                <h6 className="text-muted mb-2">
                                                    <i className="bi bi-file-text"></i> Recent Research:
                                                </h6>
                                                {prof.recent_work.map((work, workIdx) => {
                                                    const paperId = `${schoolIdx}-${deptIdx}-${profIdx}-${workIdx}`;
                                                    const isExpanded = expandedPapers[paperId];

                                                    // Extract title and year from the work string
                                                    const titleMatch = work.match(/^(.+?)\s+(\d{4}):/);
                                                    const title = titleMatch ? titleMatch[1] : 'Research Paper';
                                                    const year = titleMatch ? titleMatch[2] : '';
                                                    const summary = work.replace(/^.+?\d{4}:\s*/, '');

                                                    return (
                                                        <div key={workIdx} className="mb-3 p-3 bg-light rounded">
                                                            <div className="d-flex justify-content-between align-items-start">
                                                                <div className="flex-grow-1">
                                                                    <strong>{title}</strong>
                                                                    {year && <span className="badge bg-secondary ms-2">{year}</span>}
                                                                </div>
                                                                <button
                                                                    className="btn btn-sm btn-link"
                                                                    onClick={() => togglePaper(paperId)}
                                                                >
                                                                    <i className={`bi bi-chevron-${isExpanded ? 'up' : 'down'}`}></i>
                                                                </button>
                                                            </div>

                                                            {isExpanded && (
                                                                <p className="mt-2 mb-0 text-muted small">
                                                                    {summary}
                                                                </p>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
