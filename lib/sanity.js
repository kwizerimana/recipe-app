// lib/sanity.js
import {createPreviewSubscriptionHook, createCurrentUserHook} from 'next-sanity'
import createImageUrlBuilder from '@sanity/image-url'
import {createClient} from 'next-sanity'
import { PortableText as PortableTextComponent } from '@portabletext/react'
// lib/sanity.js


const config={
    projectId:"fd1bx5sx",
    dataset:"production",
    apiVersion:"2021-10-21",
    useCdn:false,
};


// Helper function for using the current logged in user account
export const useCurrentUser = createCurrentUserHook(config)
export const sanityClient=createClient(config);

export const usePreviewSubscription = createPreviewSubscriptionHook(config);

export const urlFor = (source) => createImageUrlBuilder(config).image(source);

export const PortableText = (props) => <PortableTextComponent components={{}} {...props} />
;