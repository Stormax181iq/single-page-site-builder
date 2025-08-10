--
-- PostgreSQL database dump
--

-- Dumped from database version 16.9 (Ubuntu 16.9-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 16.9 (Ubuntu 16.9-0ubuntu0.24.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: templates; Type: TABLE; Schema: public; Owner: "ec2-user"
--

CREATE TABLE public.templates (
    name character varying(63) NOT NULL
);


ALTER TABLE public.templates OWNER TO "ec2-user";

--
-- Name: user_sites; Type: TABLE; Schema: public; Owner: "ec2-user"
--

CREATE TABLE public.user_sites (
    id integer NOT NULL,
    user_id integer,
    template_id character varying(255) NOT NULL,
    "values" jsonb NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.user_sites OWNER TO "ec2-user";

--
-- Name: user_sites_id_seq; Type: SEQUENCE; Schema: public; Owner: "ec2-user"
--

CREATE SEQUENCE public.user_sites_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_sites_id_seq OWNER TO "ec2-user";

--
-- Name: user_sites_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: "ec2-user"
--

ALTER SEQUENCE public.user_sites_id_seq OWNED BY public.user_sites.id;

--
-- Name: users; Type: TABLE; Schema: public; Owner: "ec2-user"
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(30) NOT NULL,
    hash character(60) NOT NULL,
    CONSTRAINT users_username_check CHECK (((username)::text ~ '^[A-Za-z0-9éàê]+(?:[   _-][A-Za-z0-9]+)*$'::text))
);


ALTER TABLE public.users OWNER TO "ec2-user";

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: "ec2-user"
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO "ec2-user";

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: "ec2-user"
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: user_sites id; Type: DEFAULT; Schema: public; Owner: "ec2-user"
--

ALTER TABLE ONLY public.user_sites ALTER COLUMN id SET DEFAULT nextval('public.user_sites_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: "ec2-user"
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: templates templates_pkey; Type: CONSTRAINT; Schema: public; Owner: "ec2-user"
--

ALTER TABLE ONLY public.templates
    ADD CONSTRAINT templates_pkey PRIMARY KEY (name);


--
-- Name: user_sites user_sites_pkey; Type: CONSTRAINT; Schema: public; Owner: "ec2-user"
--

ALTER TABLE ONLY public.user_sites
    ADD CONSTRAINT user_sites_pkey PRIMARY KEY (id);


--
-- Name: users users_primary_key; Type: CONSTRAINT; Schema: public; Owner: "ec2-user"
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_primary_key PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: "ec2-user"
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: users_id_idx; Type: INDEX; Schema: public; Owner: "ec2-user"
--

CREATE INDEX users_id_idx ON public.users USING btree (id);


--
-- Name: users_username_idx; Type: INDEX; Schema: public; Owner: "ec2-user"
--

CREATE INDEX users_username_idx ON public.users USING btree (username);


--
-- Name: user_sites user_sites_template_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: "ec2-user"
--

ALTER TABLE ONLY public.user_sites
    ADD CONSTRAINT user_sites_template_id_fkey FOREIGN KEY (template_id) REFERENCES public.templates(name);


--
-- Name: user_sites user_sites_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: "ec2-user"
--

ALTER TABLE ONLY public.user_sites
    ADD CONSTRAINT user_sites_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


-- Added manually

INSERT INTO public.templates (name)
VALUES
('car-rent'),
('wedding-bootstrap-template'),
('life-insurance'),
('beauty-salon');

--
-- PostgreSQL database dump complete
--

