import React from 'react';
import './CursosPage.css';
import { createTheme } from '@mui/material/styles';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import { Crud } from '@toolpad/core/Crud';
import { DemoProvider, useDemoRouter } from '@toolpad/core/internal';
import { Button, Box, useMediaQuery } from '@mui/material';
import { useCursosDataSource } from '../../hooks/useCursosDataSource';

const demoTheme = createTheme({
  palette: {
    custom: {
      main: '#a56571',
      contrastText: '#fff',
    },
  },
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true },
});

export default function CursosPage() {
  const router = useDemoRouter('/cursos');
  const { curso, isCreating, isEditing, dataSource, cursosCache } = useCursosDataSource(router);
  const isSmallScreen = useMediaQuery('(max-width: 768px)');

  return (
    <DemoProvider>
      <AppProvider theme={demoTheme} router={router}>
        <DashboardLayout>
          <PageContainer title="Tabla de Cursos">
            {(isCreating || isEditing) && (
              <Box mb={2}>
                <Button
                  variant="outlined"
                  className="custom-cancel-button"
                  onClick={() => router.navigate('/cursos')}
                >
                  Cancelar
                </Button>
              </Box>
            )}
            <Box className="crud-scroll-wrapper">
              <Crud
                dataSource={dataSource}
                dataSourceCache={cursosCache}
                rootPath="/cursos"
                initialPageSize={isSmallScreen ? 5 : 9}
                defaultValues={{
                  curso: curso?.curso || '',
                  tematica: curso?.tematica || '',
                  instructor: curso?.instructor || '',
                  descripcion: curso?.descripcion || '',
                }}
              />
            </Box>

          </PageContainer>
        </DashboardLayout>
      </AppProvider>
    </DemoProvider>
  );
}
