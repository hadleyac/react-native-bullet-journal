import React, { useState } from 'react';
import { Drawer, DrawerHeader, DrawerItem, Icon, DrawerBottom, DrawerSection, Appbar, Heading, BodyText } from 'material-bread';
import { View } from 'react-native';

function DrawerPage() {
  const [isOpen, setIsOpen] = useState(false);

  const DrawerContent = () => {
    return (
      <View>
        <DrawerHeader title={'Jon Snow'} subtitle={'Knows nothing'} />
        <DrawerSection bottomDivider>
          <DrawerItem text={'Inbox'} icon={'mail'} active />
          <DrawerItem text={'Outbox'} icon={'send'} />
          <DrawerItem text={'Favorites'} icon={'favorite'} />
        </DrawerSection>
      </View>
    );
  };

  const PageContent = () => {
    return (
      <View style={{ marginTop: 20, alignItems: 'center', width: '100%', flex: 1 }}>
        <Heading type={4} style={{ marginBottom: 20 }}>
          This is a page
        </Heading>
        <BodyText text={'Click the menu button to open the drawer'} />
        <BodyText text={'Click outside the drawer to close it'} />
      </View>
    );
  };

  const AppbarContent = isOpen => {
    return (
      <Appbar
        barType={'normal'}
        title={'Page Title'}
        navigation={'menu'}
        onNavigation={() => setIsOpen(true)}
        actionItems={[{ name: 'search' }, { name: 'more-vert' }]}
      />
    );
  };

  const styles = {
    container: {
      zIndex: 1,
      border: '1px solid rgba(0,0,0,.12)'
    },
    body: {
      backgroundColor: '#eee',
      height: 500,
      flex: 1
    },
  };

  return (
    <View style={styles.container}>
      <Drawer
        open={isOpen}
        scrimStyles={{ position: 'absolute' }}
        drawerContent={<DrawerContent />}
        onClose={() => setIsOpen(false)}
        animationTime={250}>
        <View style={styles.body}>
          <AppbarContent />
          <PageContent />
        </View>
      </Drawer>
    </View>
  )
}

export default DrawerPage
