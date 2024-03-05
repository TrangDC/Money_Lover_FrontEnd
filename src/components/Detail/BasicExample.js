import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function BasicExample() {
    return (
        <div className="card ml-5" style={{ width: '90vh', height: '300px' }}>
            <div className="card-header ml-11">
                <h4>Transaction Details</h4>
            </div>
            <div className="card-body">
                <blockquote className="blockquote mb-0">
                    <div className="flex">
                        <div className="transaction-footer ml-7">
                            <img
                                src="https://docs.material-tailwind.com/img/face-2.jpg"
                                alt="avatar"
                                className="relative inline-block h-12 w-13 !rounded-full object-cover object-center"
                            />
                        </div>
                        <div className="ml-7">
                            <h1>Tên ví</h1>
                            <div className="transaction-footer">
                                <h5>Tiền ví</h5>
                                <cite title="Source Title"></cite>
                            </div>
                            <footer className="transaction-footer text-gray-500">
                                <p className='text-sm'>Friday_11/11/1111</p>
                                <cite title="Source Title"></cite>
                            </footer>
                        </div>
                    </div>
                    <hr className="mt-1 mb-2" style={{ width: '250px', borderColor: 'black', borderWidth: '1px' }} />
                    <div className={'ml-20'} style={{ color: 'red' }}><h1>-15,000.00</h1></div>
                </blockquote>
            </div>
        </div>
    );
}

export default BasicExample;