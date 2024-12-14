'use client'

import Axios from '@/Axios/Axios'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { RefreshCw, Trash2 } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import successicon from '../../../../../../public/Group.svg'
import crossicon from '../../../../../../public/x.svg'
import warningicon from '../../../../../../public/alert-triangle.svg'
import fbicon from '../../../../../../public/Vector.svg'
import settingicon from '../../../../../../public/settings.svg'

function ShowAndConnectPage({
  fbpage,
  getWorkSpaceDetails,
  activeWorkspace,
}: any) {
  const [fetchFbPageLoad, setFetchFbPageLoad] = useState(false)
  const [clientPages, setClientPages] = useState([])
  const [isPageLoad, setIsPageLoad] = useState(false)
  const [token, setToken] = useState('')
  const [deleteLoad, setDeleteLoad] = useState<any>({})
  const [addPagesLoad, setAddPagesLoad] = useState(false)
  const [buttonStatus, setButtonStatus] = useState<any>({})
  const [userName, setUserName] = useState('')
  const [loadRefreshPage, setLoadRefreshPage] = useState(false)

  const onReferchPage = async (id: any) => {
    setLoadRefreshPage(true)
    try {
      const res = await Axios.post('/refresh-page', { page_id: id })
      if (res.status === 200 && res.data.valid) {
        getWorkSpaceDetails(activeWorkspace)
      } else {
        console.log('error', res.data.message)
        getWorkSpaceDetails(activeWorkspace)
      }
    } catch (error) {
      console.log('error', error)
      getWorkSpaceDetails(activeWorkspace)
    } finally {
      setLoadRefreshPage(false)
    }
  }

  const handlePageAccess = async (item: any) => {
    setAddPagesLoad(true)
    setButtonStatus({ ...buttonStatus, [item?.id]: 'loading' })
    setIsPageLoad(true)
    const body = { pageId: item?.id }
    try {
      const response = await Axios.post('/connect-pages', body)
      if (response.status === 200 && response.data.valid) {
        getWorkSpaceDetails(activeWorkspace)
      } else {
        getWorkSpaceDetails(activeWorkspace)
      }
    } catch (error) {
      console.log('error', error)
      getWorkSpaceDetails(activeWorkspace)
    } finally {
      setAddPagesLoad(false)
      setButtonStatus({ ...buttonStatus, [item?.id]: 'notloading' })
    }
  }

  const handleSubscribeApp = async (pageid: any) => {
    try {
      const res = await Axios.post('/subscribe-app', { pageId: pageid })
      if (res.status === 200 && res.data.valid) {
        getWorkSpaceDetails(activeWorkspace)
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  const handleDeletePage = async (pageid: any) => {
    setDeleteLoad({ ...deleteLoad, [pageid]: 'loading' })
    try {
      const res = await Axios.post('/delete-page', { pageId: pageid })
      if (res.status === 200 && res.data.valid) {
        getWorkSpaceDetails(activeWorkspace)
      } else {
        console.log('error', res.data.message)
      }
    } catch (error) {
      console.log('error', error)
    } finally {
      setDeleteLoad({ ...deleteLoad, [pageid]: 'notloading' })
    }
  }

  return (
    <>
      <div className=" mt-3 px-1">
        <Accordion type="single" collapsible className="w-full   ">
          {fbpage?.length > 0 &&
            fbpage?.map((item: any, idx: number) => (
              <>
                {item?.tasks?.includes('MANAGE') ||
                !item?.hasOwnProperty('connected') ? (
                  <>
                    <AccordionItem
                      value={`item-${item?.id}`}
                      className={`border-l-2  mb-2 mb-md-3 shadow-accordion rounded-sm py-2 px-2 shadow-sm item-center dark:bg-[#313131] my-4 ${
                        item?.connected === 'success'
                          ? item?.leadgen_tos_accepted === false ||
                            !item?.lead_access ||
                            item?.subscribed_apps?.data[0]?.id !==
                              '1052762895750334' ||
                            !item?.subscribed_apps?.data[0]?.subscribed_fields.includes(
                              'leadgen',
                            )
                            ? 'border-l-[#FF9EAF]'
                            : ''
                          : item?.connected === 'failed'
                          ? 'border-l-[#FF9EAF]'
                          : ''
                      }  md:py-4 md:px-4`}
                    >
                      <AccordionTrigger className="no-underline hover:no-underline py-2 ">
                        <div className=" flex justify-between items-center w-[92%]">
                          <div className="flex justify-start gap-2 flex-1 items-center">
                            {(item?.connected === 'success' ||
                              !item?.hasOwnProperty('connected')) && (
                              <Image
                                className=" w-[14px] h-[14px] md:w-[19px] md:h-[19px]"
                                src={successicon}
                                alt=""
                              />
                            )}
                            <p className="addpages-name p-0 m-0">
                              {item?.name}
                            </p>
                            {buttonStatus[item?.id] === 'loading' && (
                              <div className=" flex items-center justify-center">
                                <span className="loaderfbpage"></span>
                              </div>
                            )}
                          </div>

                          {item?.connected === 'pending' && (
                            <Button
                              disabled={addPagesLoad ? true : false}
                              onClick={(e) => {
                                e.stopPropagation()
                                handlePageAccess(item)
                              }}
                              className="w-[77px] h-[30px] text-[12px]"
                            >
                              {buttonStatus[item?.id] === 'loading'
                                ? 'Connect...'
                                : 'Connect'}
                            </Button>
                          )}
                          {(item?.connected === 'success' ||
                            item?.connected === 'failed') && (
                            <>
                              {item?.leadgen_tos_accepted === false ||
                              !item?.lead_access ||
                              item?.subscribed_apps?.data[0]?.id !==
                                '1052762895750334' ||
                              !item?.subscribed_apps?.data[0]?.subscribed_fields.includes(
                                'leadgen',
                              ) ? (
                                <div className="flex gap-1 justify-end items-center">
                                  <Image
                                    className=" w-[14px] h-[14px] md:w-[19px] md:h-[19px]"
                                    src={warningicon}
                                    alt=""
                                  />
                                  <p className="p-0 m-0 addpages-p">
                                    Action required
                                  </p>
                                </div>
                              ) : null}
                            </>
                          )}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div>
                          <div className="mb-3">
                            {' '}
                            {item?.connected === 'failed' ? (
                              <p className="addpages-p p-0 m-0">
                                <Image
                                  className=" w-[14px] h-[14px] md:w-[19px] md:h-[19px]"
                                  src={warningicon}
                                  alt=""
                                />{' '}
                                {item?.user_name ? item?.user_name : userName}{' '}
                                may not be admin business account that owns this
                                page
                              </p>
                            ) : null}
                          </div>
                          {(item?.connected === 'success' ||
                            item?.connected === 'failed') && (
                            <div>
                              {item?.connected === 'success' ? (
                                <>
                                  {item?.leadgen_tos_accepted === false && (
                                    <div className="mb-3 flex justify-start items-center gap-1">
                                      <Image
                                        className=" w-[14px] h-[14px] md:w-[19px] md:h-[19px]"
                                        src={crossicon}
                                        alt=""
                                      />
                                      {item?.leadgen_tos_accepted === false && (
                                        <p className="addpages-p p-0 m-0">
                                          {' '}
                                          TOS Not Accepted,{' '}
                                          <a
                                            href="https://www.facebook.com/ads/leadgen/tos"
                                            target="_blank"
                                            style={{ color: 'black' }}
                                          >
                                            <b>click here</b>
                                          </a>{' '}
                                          to accept
                                        </p>
                                      )}
                                    </div>
                                  )}
                                </>
                              ) : (
                                ''
                              )}

                              {item?.connected === 'success' ? (
                                <>
                                  {(item?.subscribed_apps?.data[0]?.id !==
                                    '1052762895750334' ||
                                    !item?.subscribed_apps?.data[0]?.subscribed_fields.includes(
                                      'leadgen',
                                    )) && (
                                    <div className="mb-3 flex justify-start items-center gap-1">
                                      <Image
                                        className=" w-[14px] h-[14px] md:w-[19px] md:h-[19px]"
                                        src={crossicon}
                                        alt=""
                                      />
                                      {(item?.subscribed_apps?.data[0]?.id !==
                                        '1052762895750334' ||
                                        !item?.subscribed_apps?.data[0]?.subscribed_fields.includes(
                                          'leadgen',
                                        )) && (
                                        <p className="addpages-p p-0 m-0">
                                          {' '}
                                          App Subscription,{' '}
                                          <span
                                            onClick={() =>
                                              handleSubscribeApp(item?.id)
                                            }
                                            style={{
                                              color: 'black',
                                              cursor: 'pointer',
                                            }}
                                          >
                                            <b>click here</b>
                                          </span>{' '}
                                          to retry
                                        </p>
                                      )}
                                    </div>
                                  )}
                                </>
                              ) : (
                                ''
                              )}

                              {item?.connected === 'success' ? (
                                <>
                                  {!item?.lead_access && (
                                    <div className="mb-3 flex justify-start items-center gap-1">
                                      <Image
                                        className=" w-[14px] h-[14px] md:w-[19px] md:h-[19px]"
                                        src={crossicon}
                                        alt=""
                                      />
                                      {!item?.lead_access && (
                                        <p className="addpages-p p-0 m-0">
                                          {' '}
                                          Lead Access, contact LeapX support
                                        </p>
                                      )}
                                    </div>
                                  )}
                                </>
                              ) : (
                                ''
                              )}
                            </div>
                          )}

                          <div className=" flex justify-between items-center">
                            <div className=" flex justify-start gap-1 items-center">
                              <Image
                                className=" w-[14px] h-[14px] md:w-[19px] md:h-[19px]"
                                src={fbicon}
                                alt=""
                              />
                              <p className="p-0 m-0 addpages-p" addpages-p>
                                {item?.tasks?.includes('MANAGE') ||
                                !item?.hasOwnProperty('connected')
                                  ? `${
                                      item?.user_name
                                        ? item?.user_name
                                        : userName
                                    } has full access to this page`
                                  : `${
                                      item?.user_name
                                        ? item?.user_name
                                        : userName
                                    } has partial access to this page`}
                              </p>
                            </div>
                            <div>
                              {item?.connected === 'success' ? (
                                item?.subscribed_apps?.data[0]?.id !==
                                  '1052762895750334' ||
                                !item?.subscribed_apps?.data[0]?.subscribed_fields?.includes(
                                  'leadgen',
                                ) ||
                                !item?.lead_access ||
                                item?.leadgen_tos_accepted === false ? (
                                  <>
                                    <button
                                      onClick={() => onReferchPage(item?.id)}
                                      disabled={loadRefreshPage ? true : false}
                                      className="me-3"
                                    >
                                      <RefreshCw
                                        className={`text-black w-[18px] h-[18px] ${
                                          loadRefreshPage ? 'refreshpage' : ''
                                        }`}
                                      />
                                    </button>
                                  </>
                                ) : (
                                  ''
                                )
                              ) : (
                                ''
                              )}

                              <button
                                onClick={() => handleDeletePage(item?.id)}
                                disabled={
                                  deleteLoad[item?.id] === 'loading'
                                    ? true
                                    : false
                                }
                              >
                                <Trash2
                                  style={{
                                    opacity:
                                      deleteLoad[item?.id] === 'loading'
                                        ? '0.7'
                                        : '1',
                                  }}
                                  className="text-red-500 w-[18px] h-[18px] m-0 "
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </>
                ) : (
                  <>
                    {/* action required */}
                    <AccordionItem
                      value={`item-${item?.id}`}
                      className={`border-l-2 bg-white  mb-2 mb-md-3  rounded-sm py-2 px-2 shadow-accordion item-center  border-l-[#FF9EAF] md:py-4 md:px-4`}
                    >
                      <AccordionTrigger className="no-underline hover:no-underline py-2">
                        <div className=" flex justify-between items-center w-[92%]">
                          <div className="flex justify-start gap-1 items-center ">
                            {/* <Image src={successicon} alt="" /> */}
                            <p className="p-0 m-0 addpages-name">
                              {item?.name}
                            </p>
                          </div>
                          <div className="flex gap-1 justify-start items-center">
                            <Image
                              className=" w-[14px] h-[14px] md:w-[19px] md:h-[19px]"
                              src={warningicon}
                              alt=""
                            />
                            <p className="p-0 m-0 addpages-p">
                              Action required
                            </p>
                          </div>

                          {/* <Button className="w-[80px] h-[30px] bg-[#62c] text-white text-[12px]">Connect</Button> */}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="mb-3 mt-3 gap-1 flex items-center justify-start">
                          <Image
                            src={warningicon}
                            className=" w-[14px] h-[14px] md:w-[19px] md:h-[19px] "
                            alt=""
                          />
                          <p className="p-0 m-0 addpages-p">
                            {' '}
                            {item?.user_name ? item?.user_name : userName}{' '}
                            doesn’t have admin access to link this page to LeapX
                          </p>
                        </div>
                        <div className=" mb-3 flex items-center justify-start gap-1">
                          <Image
                            className=" w-[14px] h-[14px] md:w-[19px] md:h-[19px] "
                            src={settingicon}
                            alt=""
                          />
                          <p className="p-0 m-0 addpages-p">
                            {' '}
                            Add pages using the admin account{' '}
                            <a
                              href="+"
                              target="_blank"
                              style={{ color: '#62c' }}
                            >
                              (refer this link)
                            </a>
                          </p>
                        </div>
                        {/* delete button container */}
                        <div className=" flex justify-between items-center">
                          <div className="flex justify-start items-center gap-1">
                            <Image
                              src={fbicon}
                              alt=""
                              className=" w-[14px] h-[14px] md:w-[19px] md:h-[19px]"
                            />
                            <p className="p-0 m-0 addpages-p">
                              {item?.user_name ? item?.user_name : userName} has
                              partial access to this page
                            </p>
                          </div>

                          <div>
                            <button
                              disabled={
                                deleteLoad[item?.id] === 'loading'
                                  ? true
                                  : false
                              }
                              onClick={() => handleDeletePage(item?.id)}
                            >
                              <Trash2
                                style={{
                                  opacity:
                                    deleteLoad[item?.id] === 'loading'
                                      ? '0.7'
                                      : '1',
                                }}
                                className="text-red-500 w-[18px] h-[18px]"
                              />
                            </button>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </>
                )}
              </>
            ))}
        </Accordion>
      </div>
    </>
  )
}

export default ShowAndConnectPage
