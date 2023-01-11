import React from 'react';
import { MainLayoutSideNav } from './MainLayoutSideNav';
import { MainLayoutHeader } from './MainLayoutHeader';
import { MainLayoutLegend } from './MainLayoutLegend';
import { MetaHead, ComponentBackButton } from 'components';
import { classnames } from 'utils';

export const MainLayout: React.FC<Props> = ({ title, active, contentClass, isMobile, deviceWidth, ...props }) => {

  const smallerContentPadding = (props.lesserContentPadding || props.popClick || props.popLink) ? true : false;

  return (
    <>
      <MetaHead title={title} />
      <div className="main-layout">

        <div className="main-layout-left">
          <MainLayoutSideNav active={active} />
        </div>

        <div className="main-layout-right">

          <MainLayoutHeader
            isMobile={isMobile}
            deviceWidth={deviceWidth}
            active={active || ""}
            title={props.displayTitle}
          />

          <div className={
            classnames(
              "main-layout-page-content",
              props.bodyClass,
              smallerContentPadding && 'main-layout-page-content-sp'
            )
          }>

            {(props.popClick || props.popLink) &&

              <ComponentBackButton
                link={props.popLink}
                popReference={props.popReference}
                onClick={() => props.popClick && props.popClick()}
              />

            }

            <div className={classnames('main-layout-page-content-space', contentClass)}>

              {(props.displayTitle || props.displaySubtitle || props.subtitleComponent) && (
                <MainLayoutLegend
                  title={props.displayTitle}
                  subtitle={props.displaySubtitle}
                  subtitleComponent={props.subtitleComponent}
                  className={props.legendClassName} />
              )}

              {props.children}

            </div>

          </div>
        </div>
      </div>
    </>
  );
};

interface Props {
  title?: string,
  active?: string,
  bodyClass?: string,
  contentClass?: string,
  displayTitle?: string,
  displaySubtitle?: string,
  isMobile: boolean,
  deviceWidth: number,
  subtitleComponent?: React.ReactElement<any, any>,
  legendClassName?: string,
  popLink?: string,
  popClick?: () => void,
  lesserContentPadding?: boolean,
  children: React.ReactElement,
  popReference?: string
}
