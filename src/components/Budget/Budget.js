import React from 'react';
import {Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator} from '@chakra-ui/react';
import ProgressCircle from './ProgressCircle';

const Budget = () => {
    return (
        <div>
            <div style={{maxHeight: '600px',maxWidth: '500px',
                backgroundColor: 'white',margin: 'auto',
                borderRadius: '10px'}}>
                <Tabs position="relative" variant="unstyled">
                    <TabList>
                        <Tab>This Month</Tab>
                        <Tab>Two</Tab>
                        <Tab>Three</Tab>
                    </TabList>
                    <TabIndicator
                        mt="-1.5px"
                        height="2px"
                        bg="blue.500"
                        borderRadius="1px"
                    />
                    <TabPanels>
                        <TabPanel>
                            <ProgressCircle value={8000} maxValue={10000} />

                        </TabPanel>
                        <TabPanel>
                            <p>two!</p>
                        </TabPanel>
                        <TabPanel>
                            <p>three!</p>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </div>

        </div>
    );
};

export default Budget;
